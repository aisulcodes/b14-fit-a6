import Image from "next/image";
import Link from "next/link";

import heroImage from "@/assets/hero-banner.png";

export default function Banner() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16">
      <div className="mx-auto flex min-h-[480px] max-w-[1340px] flex-col items-center justify-between gap-10 overflow-hidden rounded-2xl border border-[#25282f] bg-[#15171c] px-6 py-10 sm:px-8 md:px-10 lg:flex-row lg:px-16 lg:py-0">

        {/* left text */}
        <div className="max-w-[650px]">

          <p className="mb-5 text-xs font-bold tracking-[0.15em] text-[#ccff00] sm:text-sm">WORKOUT LIBRARY</p>

          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">TRAIN WITH INTENT. LOG EVERY SET.</h1>

          {/* dc text*/}
          <p className="mt-6 max-w-[580px] text-base leading-7 text-[#9ca0aa] sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.</p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center rounded-md bg-[#ccff00] px-7 py-3 text-sm font-bold text-black transition hover:bg-[#b8e600]"
          >BROWSE WORKOUTS</Link>

        </div>

        {/* imageee */}
        <div className="relative hidden w-full max-w-[420px] shrink-0 md:block">
          <Image
            src={heroImage}
            alt="Workout"
            width={500}
            height={500}
            className="h-auto w-full object-contain"
          />
        </div>

      </div>
    </section>
  );
}