import ContactForm from "@/components/sections/ContactForm";
import Divisions from "../home/fragments/Divisions";
import FAQ from "../home/fragments/FAQ";
import Rewards from "../home/fragments/Rewards";
import AboutContent from "./fragments/AboutContent";
import Hero from "./fragments/Hero";
import Leadership from "./fragments/Leadership";
import VideoSection from "./fragments/VideoSection";

export default function AboutUsPage() {
  return (
    <>
      <Hero />
      <VideoSection />
      <AboutContent />
      <Divisions />
      <Leadership />
      <Rewards />
      <FAQ />
      <ContactForm />
    </>
  );
}
