import AboutUs from "@/ui/(web)/about";
import Display from "@/ui/(web)/display";
import Hero from "@/ui/(web)/hero";
import Reviews from "@/ui/(web)/reviews";
import Showcase from "@/ui/(web)/showcase";
import WhyUs from "@/ui/(web)/why-us";

export default function Home() {
  return (
    <>
      <Hero />
      <Display />
      <AboutUs />
      <WhyUs />
      <Showcase />
      <Reviews />
    </>
  );
}
