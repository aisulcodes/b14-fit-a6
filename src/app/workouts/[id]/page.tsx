"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Workout } from "@/types/workoutType";
import { useFitlog } from "@/context/FitlogContext";
import Image from "next/image";

export default function WorkoutDetails() {
  const params = useParams();

  const { addToPlan, saveForLater } = useFitlog();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${params.id}`
        );

        const data: Workout = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error("Failed to fetch workout:", error);
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d0e10] px-6 py-20 text-white">
        <p className="text-gray-400">Loading workout...</p>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0d0e10] px-6 py-20 text-white">
        <h1 className="text-3xl font-bold">Workout not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0e10] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2">

          {/* imagee */}
          <div>
            <Image
              src={workout.image}
              alt={workout.name}
              className="h-full max-h-[650px] w-full rounded-2xl object-cover"
            />
          </div>

          {/* details */}
          <div className="flex flex-col">

            {/* muscle groups */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#b7ff3c] px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {muscle}</span>
              ))}
            </div>

            {/* workout er nam */}
            <h1 className="mt-5 text-4xl font-bold uppercase md:text-5xl">
              {workout.name}</h1>

            {/* dc */}
            <p className="mt-4 leading-7 text-gray-400">
              {workout.description}</p>

            {/* workout Info */}
            <div className="mt-7 overflow-hidden rounded-xl border border-[#20232a] bg-[#15171c]">

              {/* equipment */}
              <div className="flex items-center justify-between border-b border-[#20232a] px-4 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Equipment</span>
                <span className="text-sm text-gray-200">
                  {workout.equipment}</span>
              </div>

              {/* difficulty */}
              <div className="flex items-center justify-between border-b border-[#20232a] px-4 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Difficulty</span>
                <span className="text-sm text-gray-200">
                  {workout.difficulty}</span>
              </div>

              {/* sets */}
              <div className="flex items-center justify-between border-b border-[#20232a] px-4 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Sets</span>

                <span className="text-sm text-gray-200">
                  {workout.sets}</span>
              </div>

              {/* rreps */}
              <div className="flex items-center justify-between border-b border-[#20232a] px-4 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Reps</span>

                <span className="text-sm text-gray-200">
                  {workout.reps}</span>
              </div>

              {/* durations */}
              <div className="flex items-center justify-between border-b border-[#20232a] px-4 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Duration
                </span>
                <span className="text-sm text-gray-200">
                  {workout.duration} min
                </span>
              </div>

              {/* calories */}
              <div className="flex items-center justify-between border-b border-[#20232a] px-4 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Calories
                </span>
                <span className="text-sm text-gray-200">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              {/* rating */}
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-xs uppercase text-gray-500">
                  Rating
                </span>
                <span className="text-sm text-gray-200">
                  ★ {workout.rating}
                </span>
              </div>
            </div>

            {/* instructions  */}
            <div className="mt-7">
              <h2 className="text-sm font-bold uppercase">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3 text-sm leading-6 text-gray-400">
                {workout.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-gray-500">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* btn */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => addToPlan(workout)}
                className="rounded-full bg-[#b7ff3c] px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-[#c9ff70]"
              >
                Add to today's plan
              </button>

              <button
                onClick={() => saveForLater(workout)}
                className="rounded-full border border-[#b7ff3c] px-6 py-3 text-sm font-bold uppercase text-[#b7ff3c] transition hover:bg-[#b7ff3c] hover:text-black"
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