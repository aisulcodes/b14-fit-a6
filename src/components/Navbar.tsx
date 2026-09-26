"use client";

import { useFitlog } from "@/context/FitlogContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo.png";

export default function Navbar() {
    const { plan, saved } = useFitlog();

    const pathname = usePathname();

    const isWorkoutActive = pathname === "/";
    const isPlanActive = pathname === "/my-plan";

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-[#202126] bg-[#0d0e10]">
            <div className="relative flex min-h-[88px] w-full flex-wrap items-center px-4 py-3 sm:px-6 md:flex-nowrap md:px-10 md:py-0">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src={logo} alt="FitLog" width={100} height={40} className="h-8 w-auto object-contain sm:h-10"
                    />
                    <span className="text-base font-bold text-white sm:text-lg">FITLOG</span>
                </Link>

                {/* center item */}
                <div className="order-3 mt-3 flex w-full items-center justify-center gap-2 md:absolute md:left-1/2 md:order-none md:mt-0 md:w-auto md:-translate-x-1/2">
                    <Link
                        href="/" className={`rounded-full px-4 py-2 text-xs font-medium transition sm:px-5 sm:py-2.5 ${isWorkoutActive ? "bg-[#17250b] text-[#ccff00]"
                            : "text-[#8d919a] hover:text-white"
                            }`}
                    >Workouts</Link>

                    <Link
                        href="/my-plan" className={`rounded-full px-4 py-2 text-xs font-medium transition sm:px-5 sm:py-2.5 ${isPlanActive
                            ? "bg-[#17250b] text-[#ccff00]"
                            : "text-[#8d919a] hover:text-white"
                            }`}
                    > My Plan </Link>
                </div>

                {/* right side er jonno */}
                <div className="ml-auto flex items-center gap-3 text-xs sm:gap-6">

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-[#b1b4bb] hover:text-white sm:gap-2"
                    >
                        <span className="hidden sm:inline">Plan</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[11px] font-bold text-black">
                            {plan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-[#b1b4bb] hover:text-white sm:gap-2"
                    >
                        <span className="hidden sm:inline">Saved</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#383b42] px-1.5 text-[11px] text-[#b1b4bb]">
                            {saved.length}
                        </span>
                    </Link>

                </div>
            </div>
        </nav>
    );
}