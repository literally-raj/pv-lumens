import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";

// ponytail: Unsplash stock imagery — swap in real award/ceremony photography once provided
const AWARD_ITEMS = [
  {
    id: 1,
    title: "Distributor of the Year",
    desc: "Recognised for pan-India scale and delivery consistency.",
    url: "https://images.unsplash.com/photo-1741887864007-271499b10d53?w=800&q=80",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Partner Excellence Award",
    desc: "Honoured by OEM partners for channel enablement.",
    url: "https://images.unsplash.com/photo-1769028866840-14b25805a119?w=800&q=80",
    span: "md:row-span-1",
  },
  {
    id: 3,
    title: "Industry Leadership Award",
    desc: "For 24x7 SAP-driven operational reliability.",
    url: "https://images.unsplash.com/photo-1766722568942-03cc930a1f7e?w=800&q=80",
    span: "md:row-span-1",
  },
  {
    id: 4,
    title: "Regional Excellence Award",
    desc: "Acknowledged across South Asia and SAARC markets.",
    url: "https://images.unsplash.com/photo-1759560270562-468e8ba866e3?w=800&q=80",
    span: "md:row-span-2",
  },
  {
    id: 5,
    title: "Channel Partner Recognition",
    desc: "For sustained year-on-year growth with our resellers.",
    url: "https://images.unsplash.com/photo-1778864874646-1da1647a22df?w=800&q=80",
    span: "md:row-span-1",
  },
  {
    id: 6,
    title: "Operational Excellence Award",
    desc: "For technology-led operations and CRM-driven reporting.",
    url: "https://images.unsplash.com/photo-1778218736185-8c0260add718?w=800&q=80",
    span: "md:col-span-2 md:row-span-1",
  },
];

export default function Rewards() {
  return (
    <InteractiveImageBentoGallery
      imageItems={AWARD_ITEMS}
      eyebrow="OUR MILESTONES"
      title="Awards & Recognition"
      description="Two decades of trusted distribution, reflected in the recognition of our OEM partners and the channel we serve. Drag to explore, click to expand."
    />
  );
}
