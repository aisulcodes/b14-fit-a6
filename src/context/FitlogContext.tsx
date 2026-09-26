"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { toast } from "react-toastify";
import { Workout } from "@/types/workoutType";

interface FitlogContextType {
  plan: Workout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;

  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const FitlogContext = createContext<FitlogContextType | undefined>(
  undefined
);

export function FitlogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedPlan = window.localStorage.getItem("fitlog-plan");
      return savedPlan ? JSON.parse(savedPlan) : [];
    } catch {
      return [];
    }
  });

  const [saved, setSaved] = useState<Workout[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedItems = window.localStorage.getItem("fitlog-saved");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch {
      return [];
    }
  });

  // Save plan
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  // Save saved items
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: Workout) => {
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      toast.info("Already in today's plan");
      return;
    }

    setPlan([...plan, workout]);

    toast.success("Added to today's plan");
  };

  const saveForLater = (workout: Workout) => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      toast.info("Already saved");
      return;
    }

    setSaved([...saved, workout]);

    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };
  const markAsDone = (id: number) => {
    setPlan(plan.filter((item) => item.id !== id));
    toast.success("Workout completed!");
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  };

  return (
    <FitlogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </FitlogContext.Provider>
  );
}

export function useFitlog() {
  const context = useContext(FitlogContext);

  if (!context) {
    throw new Error(
      "useFitlog must be used inside FitlogProvider"
    );
  }

  return context;
}