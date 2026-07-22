import Hero from "./Hero";
import TrustedCompanies from "./TrustedCompanies";

interface HeroWithTrustedCompaniesProps {
  belowCompany: boolean;
}

export default function HeroWithTrustedCompanies({ belowCompany }: HeroWithTrustedCompaniesProps) {
  return (
    <>
      <Hero showLogoStrip={!belowCompany} />
      {belowCompany && <TrustedCompanies />}
    </>
  );
}
