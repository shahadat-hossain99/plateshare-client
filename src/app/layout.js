import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar/Navbar";
//TODO:import Footer from "@/components/Shared/Footer/Footer";
import { getUserSession } from "@/lib/core/session";
import { Toaster } from "sonner";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "PlateShare – Home",
  description:
    "Discover recipes from real home cooks, save your favorites, and build your week in minutes.",
};

export default async function RootLayout({ children }) {
  // Fetch session on the server completely securely
  const user = await getUserSession();

  return (
    <html data-theme="light" lang="en" className="h-full antialiased">
      <body
        className={`${fraunces.variable} ${jakarta.variable} min-h-full flex flex-col`}
      >
        <Navbar user={user} />

        <main>{children}</main>
        {/* <Footer /> */}
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
