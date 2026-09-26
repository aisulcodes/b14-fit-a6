import logo from "@/assets/logo.png";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-[#292b30] bg-[#191b20]">
      <div className="flex min-h-[124px] w-full items-center justify-between px-10 md:px-16">
        
        {/* left logo */}
        <div className="flex items-center gap-2">
            <Image src={logo} alt="FitLog" width={100} height={40} className="h-8 w-auto" />
            <span className="text-lg font-bold text-white">FITLOG</span>
        </div>

        {/* right copyright */}
        <p className="text-sm text-gray-400">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}