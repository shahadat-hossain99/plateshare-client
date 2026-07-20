import Categories from "@/components/Home/Categories";
import FAQ from "@/components/Home/FAQ";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import MealHighlights from "@/components/Home/MealHighlights";
import Newsletter from "@/components/Home/Newsletter";
import Statistics from "@/components/Home/Statistics";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <Statistics />
      {/* <Newsletter /> */}
      <FAQ />
    </>
  );
}
