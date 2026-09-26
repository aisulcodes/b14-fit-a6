import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workoutType";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-[#292b30] bg-[#15171c] transition duration-300 hover:-translate-y-1 hover:border-[#b7ff3c]"
    >
      <div className="relative h-48 overflow-hidden sm:h-52 md:h-56">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>

    
      <div className="p-4 sm:p-5">
        {/* category */}
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#b7ff3c] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
            >{muscle}</span>
          ))}
        </div>

        {/* workout er nam */}
        <h3 className="text-xl font-bold uppercase tracking-wide text-white"> {workout.name} </h3>

        {/* equipment */}
        <p className="mt-2 text-sm text-gray-400">{workout.equipment}</p>

    
       <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
          <span>◷ {workout.duration} min</span>

          <span>🔥 {workout.caloriesBurned} kcal</span>

          <span>★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}