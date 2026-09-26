import logo from "@/assets/logo.png";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-[#292b30] bg-[#191b20]">
      <div className="flex min-h-[124px] w-full flex-col items-center justify-center gap-4 px-4 py-6 sm:px-6 md:flex-row md:justify-between md:px-16 md:py-0">
        {/* left logo */}
        <div className="flex items-center gap-2">
            <Image src={logo} alt="FitLog" width={100} height={40} className="h-8 w-auto" />
            <span className="text-lg font-bold text-white">FITLOG</span>
        </div>

        {/* right copyright */}
        <p className="text-center text-xs text-gray-400 sm:text-sm md:text-right">
          © {new Date().getFullYear()} FitLog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}