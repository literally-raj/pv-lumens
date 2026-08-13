import ContactForm from "@/components/sections/ContactForm";
import Divisions from "./home/fragments/Divisions";
import FeaturedHighlights from "./home/fragments/FeaturedHighlights";
import HeroWithTrustedCompanies from "./home/fragments/HeroWithTrustedCompanies";
import MainTestimonial from "./home/fragments/MainTestimonial";
import PartnerEcosystem from "./home/fragments/PartnerEcosystem";
import Rewards from "./home/fragments/Rewards";
import Stats from "./home/fragments/Stats";
import TestimonialMarquee from "./home/fragments/TestimonialMarquee";
import WhyChooseUs from "./home/fragments/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <HeroWithTrustedCompanies belowCompany={false} />
      <Stats/>
      <Divisions />
      <MainTestimonial />
      <WhyChooseUs />
      <PartnerEcosystem />
      <Rewards />
      <TestimonialMarquee />
      <ContactForm />
    </>
  );
}
