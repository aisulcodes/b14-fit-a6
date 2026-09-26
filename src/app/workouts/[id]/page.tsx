"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Workout } from "@/types/workoutType";
import { useFitlog } from "@/context/FitlogContext";

export default function WorkoutDetails() {
  const params = useParams();
  const { addToPlan, saveForLater } = useFitlog();

  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => response.json())
      .then((data: Workout[]) => {
        const foundWorkout = data.find(
          (item) => item.id === Number(params.id)
        );

        setWorkout(foundWorkout || null);
      });
  }, [params.id]);

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0d0e10] px-6 py-20 text-white">
        <h1 className="text-3xl font-bold">
          Workout not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0e10] px-6 py-16 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2">

          {/* Image */}
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full rounded-2xl object-cover"
          />

          {/* Details */}
          <div>

            {/* Muscle Groups */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#b7ff3c] px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Workout Name */}
            <h1 className="mt-5 text-4xl font-bold uppercase">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 text-gray-400">
              {workout.description}
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">

              <div>
                <p className="text-xs text-gray-500">
                  Duration
                </p>

                <p>
                  {workout.duration} min
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Calories
                </p>

                <p>
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Rating
                </p>

                <p>
                  ★ {workout.rating}
                </p>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() => addToPlan(workout)}
                className="rounded-full bg-[#b7ff3c] px-6 py-3 font-bold uppercase text-black"
              >
                Add to today's plan
              </button>

              <button
                onClick={() => saveForLater(workout)}
                className="rounded-full border border-[#b7ff3c] px-6 py-3 font-bold uppercase text-[#b7ff3c]"
              >
                Save for later
              </button>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}