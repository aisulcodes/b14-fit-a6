"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workoutType";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        return response.json();
      })
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load workouts.");
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="library"
      className="bg-[#0d0e10] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16"
    >
      {/* section setting */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl md:text-5xl">THE LIBRARY</h2>

        <p className="mt-3 text-sm text-gray-400 md:text-base">Twelve lifts covering every major muscle group.</p>
      </div>

      {/* loading */}
      {loading && (
        <p className="text-sm text-gray-400">Loading workouts...</p>
      )}

      {/* error er jonno */}
      {!loading && error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* workout grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}