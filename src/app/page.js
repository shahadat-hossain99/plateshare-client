import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Input from "@/components/UI/Input";
import SectionTitle from "@/components/UI/SectionTitle";
import Image from "next/image";

export default function Home() {
  return (
    <Container className="py-20 space-y-10">
      <SectionTitle
        title="Welcome to PlateShare"
        subtitle=" a recipe sharing & meal planning platform."
        center
      />

      <div className="max-w-md mx-auto space-y-5">
        <Input placeholder="Search listings..." />

        <div className="flex gap-4 justify-center">
          <Button>Explore</Button>

          <Button variant="secondary">Register</Button>

          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </Container>
  );
}
