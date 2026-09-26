"use client";

import { useState } from "react";
import Link from "next/link";

import { useFitlog } from "@/context/FitlogContext";

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">(
    "plan"
  );

  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useFitlog();

  const workouts = activeTab === "plan" ? plan : saved;

  return (
    <main className="min-h-screen bg-[#0d0e10] px-6 py-16 text-white md:px-10">
      <h1 className="text-4xl font-bold uppercase">
        MY PLAN
      </h1>

      <p className="mt-2 text-gray-400">
        Manage your workouts and saved exercises.
      </p>

      {/* tabs setup */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => setActiveTab("plan")}
          className={`rounded-full px-5 py-2 text-sm font-bold ${
            activeTab === "plan"
              ? "bg-[#b7ff3c] text-black"
              : "border border-gray-700 text-gray-400"
          }`}
        >
          Today's Plan ({plan.length})
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`rounded-full px-5 py-2 text-sm font-bold ${
            activeTab === "saved"
              ? "bg-[#b7ff3c] text-black"
              : "border border-gray-700 text-gray-400"
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      {/* cart */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="overflow-hidden rounded-xl border border-[#292b30] bg-[#15171c]"
          >
            <img
              src={workout.image}
              alt={workout.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="font-bold uppercase">
                {workout.name}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                {workout.equipment}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="rounded-full bg-[#b7ff3c] px-4 py-2 text-xs font-bold text-black"
                >
                  View Details
                </Link>

                {activeTab === "plan" ? (
                  <button
                    onClick={() => removeFromPlan(workout.id)}
                    className="rounded-full border border-red-500 px-4 py-2 text-xs text-red-400"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => removeFromSaved(workout.id)}
                    className="rounded-full border border-red-500 px-4 py-2 text-xs text-red-400"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* empty state */}
      {workouts.length === 0 && (
        <div className="mt-12 text-center text-gray-500">
          <p>
            {activeTab === "plan"
              ? "No workouts added to today's plan."
              : "No saved workouts yet."}
          </p>
        </div>
      )}
    </main>
  );
}