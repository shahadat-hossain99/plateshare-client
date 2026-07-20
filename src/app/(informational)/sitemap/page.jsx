import Link from "next/link";
import { Network, ArrowRight, ChefHat } from "lucide-react";
import Container from "@/components/UI/Container";

export default function SitemapPage() {
  const sections = [
    {
      title: "Discover",
      links: [
        { name: "Home Base", href: "/" },
        { name: "Browse Recipes", href: "/recipes" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Meal Planning Tips", href: "/tips" },
      ],
    },
    {
      title: "Account Hub",
      links: [
        { name: "My Profile", href: "/profile" },
        { name: "My Cookbook", href: "/my-cookbook" },
        { name: "Add Recipe", href: "/add-recipe" },
        { name: "Meal Planner", href: "/meal-planner" },
      ],
    },
    {
      title: "Legal & Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "FAQs", href: "/faqs" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Contact", href: "/contact" },
        { name: "About Us", href: "/about" },
      ],
    },
  ];

  return (
    <div className="relative min-h-[88vh] w-full flex items-center bg-gradient-to-br from-[var(--background)] via-white to-[var(--primary)]/10 overflow-hidden select-none py-12">
      {/* Background Food/Recipe Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="sitemap-premium-topo"
              width="180"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M-40 40 Q 30 10, 90 40 T 220 40"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                className="text-[var(--dark)] opacity-80"
              />
              <path
                d="M-40 90 Q 30 60, 90 90 T 220 90"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.2"
                className="text-[var(--dark)] opacity-40"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sitemap-premium-topo)" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[var(--secondary)]/20 to-[var(--primary)]/20 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl border border-gray-100/90 text-[var(--primary)]">
              <Network size={32} />
            </div>
            <span className="text-xs font-bold tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-4 py-1.5 rounded-full mb-3">
              Site Navigation
            </span>
            <h1 className="text-3xl font-black tracking-tight text-[var(--dark)] sm:text-4xl">
              Sitemap
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              A complete list of everything you can explore on PlateShare.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-6 sm:grid-cols-3">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="font-bold text-sm text-[var(--dark)] uppercase tracking-wider border-b pb-3 mb-4 opacity-70">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between text-sm text-gray-600 hover:text-[var(--primary)] font-medium transition"
                      >
                        <span>{link.name}</span>
                        <ArrowRight
                          size={14}
                          className="opacity-0 -translate-x-2 transition group-hover:opacity-100 group-hover:translate-x-0 text-[var(--primary)]"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-[var(--text-secondary)]">
            <ChefHat className="h-4 w-4 text-[var(--secondary)]" />
            <span>Built for home cooks. Powered by PlateShare.</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
