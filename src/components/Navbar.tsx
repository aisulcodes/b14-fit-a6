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
        <nav className="sticky top-0 z-50 h-[88px] w-full border-b border-[#202126] bg-[#0d0e10]">
            <div className="relative flex h-full w-full items-center px-10">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src={logo} alt="FitLog" width={100} height={40} className="h-10 w-auto object-contain"
                    />
                    <span className="text-lg font-bold text-white">FITLOG</span>
                </Link>

                {/* center item */}
                <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
                    <Link
                        href="/" className={`rounded-full px-5 py-2.5 text-xs font-medium transition ${isWorkoutActive ? "bg-[#17250b] text-[#ccff00]"
                            : "text-[#8d919a] hover:text-white"
                            }`}
                    >Workouts</Link>

                    <Link
                        href="/my-plan" className={`rounded-full px-5 py-2.5 text-xs font-medium transition ${isPlanActive
                            ? "bg-[#17250b] text-[#ccff00]"
                            : "text-[#8d919a] hover:text-white"
                            }`}
                    > My Plan </Link>
                </div>

                {/* right side er jonno */}
                <div className="ml-auto flex items-center gap-6 text-xs">

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-[#b1b4bb] hover:text-white"
                    >
                        <span>Plan</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[11px] font-bold text-black">
                            {plan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-[#b1b4bb] hover:text-white"
                    >
                        <span>Saved</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#383b42] px-1.5 text-[11px] text-[#b1b4bb]">
                            {saved.length}
                        </span>
                    </Link>

                </div>
            </div>
        </nav>
    );
}