import Link from "next/link";
import { ChefHat } from "lucide-react";

const Logo = ({ isScrolled = false }) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20 focus-visible:outline-none rounded-xl p-0.5 transition-all"
      aria-label="PlateShare - Home"
    >
      {/* Upgraded Premium Icon Frame */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--primary)]/15 bg-gradient-to-b from-[var(--primary)]/5 to-[var(--primary)]/10 text-[var(--primary)] shadow-sm transition-all duration-300 group-hover:scale-[1.04] group-hover:border-[var(--primary)]/25 group-hover:shadow-md">
        {/* Ambient background glow on hover */}
        <div className="absolute inset-0 rounded-xl bg-[var(--primary)]/5 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

        <ChefHat className="relative z-10 h-5 w-5 stroke-[2] transition-transform duration-500 ease-out group-hover:rotate-[-8deg] group-hover:scale-105" />
      </div>

      {/* Premium Typography maintaining original colors */}
      <div className="flex flex-col justify-center">
        <span className="text-base font-bold tracking-tight text-zinc-900 leading-tight">
          <span className="text-[var(--secondary)]">Plate</span>
          <span className="text-[var(--primary)] font-semibold">Share</span>
        </span>

        {/* Tagline uses a smooth height & mask transition without layout shifting */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isScrolled
              ? "grid-rows-[0fr] opacity-0 mt-0"
              : "grid-rows-[1fr] opacity-100 mt-0.5"
          }`}
        >
          <span className="overflow-hidden text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
            Cook & Plan
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
