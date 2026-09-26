"use client";

import { useState } from "react";
import Link from "next/link";

import { useFitlog } from "@/context/FitlogContext";
import Image from "next/image";

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const [sortBy, setSortBy] = useState<
    "duration" | "calories" | "rating"
  >("duration");

  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitlog();

  const workouts = activeTab === "plan" ? plan : saved;

  // sort workouts
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return a.rating - b.rating;
  });

  // Statistics
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-[#0d0e10] px-6 py-12 text-white md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <div>
          <h1 className="text-3xl font-bold uppercase md:text-4xl">
            My Plan
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* stats */}
        <div className="mt-7 grid grid-cols-1 overflow-hidden rounded-xl border border-[#24272e] bg-[#15171c] md:grid-cols-3">

          {/* exercises */}
          <div className="border-b border-[#24272e] px-5 py-5 md:border-b-0 md:border-r">
            <p className="text-xs text-gray-500">
              Exercises</p>

            <p className="mt-1 text-2xl font-bold text-[#b7ff3c]">
              {plan.length}</p>
          </div>

          {/* minutes */}
          <div className="border-b border-[#24272e] px-5 py-5 md:border-b-0 md:border-r">
            <p className="text-xs text-gray-500">
              Minutes</p>

            <p className="mt-1 text-2xl font-bold">
              {totalMinutes}</p>
          </div>

          {/* calories */}
          <div className="px-5 py-5">
            <p className="text-xs text-gray-500">
              Calories</p>

            <p className="mt-1 text-2xl font-bold">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* tab and sort */}
        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          {/* tabs */}
          <div className="flex w-fit rounded-lg border border-[#292c32] bg-[#15171c] p-1">

            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-md px-5 py-2 text-xs transition ${activeTab === "plan"
                ? "bg-[#24272d] text-white"
                : "text-gray-500 hover:text-white"
                }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-5 py-2 text-xs transition ${activeTab === "saved"
                ? "bg-[#24272d] text-white"
                : "text-gray-500 hover:text-white"
                }`}
            >
              Saved
            </button>

          </div>

          {/* sort by */}
          <div className="flex items-center gap-2">

            <span className="text-xs text-gray-500">
              Sort By </span>

            <div className="relative">

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                    | "duration"
                    | "calories"
                    | "rating"
                  )
                }
                className="appearance-none rounded-full border border-[#292c32] bg-[#15171c] px-4 py-2 pr-8 text-xs text-gray-300 outline-none"
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>


              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-gray-500">
                ▼
              </span>

            </div>

          </div>

        </div>

        {/* Workout list */}
        {sortedWorkouts.length > 0 ? (
          <div className="mt-6 space-y-4">
            {sortedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-4 rounded-xl border border-[#292c32] bg-[#15171c] p-4 sm:flex-row sm:items-center"
              >
                {/* image */}
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={128}
                  height={80}
                  unoptimized
                  className="h-28 w-full rounded-lg object-cover sm:h-20 sm:w-32"
                />

                {/* Workout Info */}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-bold uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {workout.equipment}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-gray-400">
                    <span>
                      <span className="text-[#b7ff3c]">◷</span>{" "}
                      {workout.duration} min
                    </span>

                    <span>
                      <span className="text-[#b7ff3c]">🔥</span>{" "}
                      {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      <span className="text-[#b7ff3c]">★</span>{" "}
                      {workout.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-full border border-[#383b42] px-5 py-2 text-[11px] text-gray-300 transition hover:border-gray-500 hover:text-white"
                  >
                    View Details
                  </Link>

                  {/* Only Today's Plan */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(workout.id)}
                      className="rounded-full bg-[#b7ff3c] px-5 py-2 text-[11px] font-bold text-black transition hover:bg-[#c9ff70]"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    aria-label="Remove workout"
                    className="px-2 py-2 text-lg text-gray-500 transition hover:text-red-400"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* empty state */
          <div className="mt-6 flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-[#292c32] text-center">
            <h2 className="text-sm font-bold uppercase">
              Nothing Here Yet
            </h2>

            <p className="mt-2 max-w-sm text-xs text-gray-500">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get started."
                : "Save workouts for later and they will appear here."}
            </p>

            <Link
              href="/"
              className="mt-5 rounded-full bg-[#b7ff3c] px-5 py-2 text-xs font-bold text-black transition hover:bg-[#c9ff70]"
            >
              Go to workouts
            </Link>
          </div>
        )}

      </div>
    </main >
  );
}