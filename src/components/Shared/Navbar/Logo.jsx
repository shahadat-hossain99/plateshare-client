import Link from "next/link";
// You can install lucide-react via: npm install lucide-react
import { ChefHat } from "lucide-react";

const Logo = ({ isScrolled = false }) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group focus:outline-none rounded-lg p-1"
      aria-label="PlateShare - Home"
    >
      {/* Logo Icon */}
      <div
        className={`flex items-center justify-center rounded-full bg-[var(--primary)] font-bold text-white transition-all duration-300 group-hover:scale-105 ${
          isScrolled ? "h-8 w-8 text-sm" : "h-10 w-10 text-lg"
        }`}
      >
        <ChefHat
          className={`transition-all duration-300 group-hover:rotate-6 ${
            isScrolled ? "h-4 w-4" : "h-5 w-5"
          }`}
        />
      </div>

      {/* Logo Text */}
      <div className="leading-none">
        <h1
          className={`font-extrabold text-[var(--dark)] transition-all duration-300 ${
            isScrolled ? "text-xl" : "text-2xl"
          }`}
        >
          <span className="text-[var(--secondary)]">Plate</span>
          <span className="text-[var(--primary)]">Share</span>
        </h1>
        <p
          className={`hidden text-xs text-gray-500 transition-all duration-300 sm:block ${
            isScrolled ? "opacity-0 max-h-0" : "opacity-100 max-h-4"
          }`}
        >
          Cook Smarter, Plan Better
        </p>
      </div>
    </Link>
  );
};

export default Logo;
