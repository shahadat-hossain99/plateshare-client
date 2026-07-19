import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Footer from "@/components/Shared/Footer/Footer";
import { getUserSession } from "@/lib/core/session";
import { Toaster } from "sonner";

// 1. Load the fonts
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces", // This maps to your CSS variable
  weight: ["500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta", // This maps to your CSS variable
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "PlateShare – Home",
  description:
    "Discover recipes from real home cooks, save your favorites, and build your week in minutes.",
};

export default async function RootLayout({ children }) {
  const user = await getUserSession();

  return (
    <html data-theme="light" lang="en" className="h-full antialiased">
      {/* 2. Apply the variables to the body tag */}
      <body
        className={`${fraunces.variable} ${jakarta.variable} min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)]`}
      >
        <Navbar user={user} />
        <main className="flex-grow">{children}</main>
        <Footer />

        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "white",
              border: "1px solid #e8ded2",
            },
            className: "rounded-xl shadow-lg",
          }}
        />
      </body>
    </html>
  );
}
