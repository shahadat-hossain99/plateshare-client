import CallToAction from "@/components/Home/CallToAction";
import Categories from "@/components/Home/Categories";
import FAQ from "@/components/Home/FAQ";
import FeaturedRecipes from "@/components/Home/FeaturedRecipes";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import MealHighlights from "@/components/Home/MealHighlights";
import Newsletter from "@/components/Home/Newsletter";
import Statistics from "@/components/Home/Statistics";
import Testimonials from "@/components/Home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedRecipes />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <CallToAction />
    </>
  );
}
