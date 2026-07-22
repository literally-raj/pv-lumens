import { Network, Plane, ShieldCheck, Wifi, Wrench, Zap } from "lucide-react";

export interface SolutionItem {
  name: string;
  url: string;
  image?: string;
}

export interface SolutionCategory {
  category: string;
  slug: string;
  icon: typeof ShieldCheck;
  image?: string;
  items: SolutionItem[];
}

export const SOLUTIONS: SolutionCategory[] = [
  {
    category: "Network Infrastructure",
    slug: "network-infrastructure",
    icon: Network,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    items: [
      { name: "Cabinets and Racks", url: "https://pvlumens.com/Network-Infrastructure/40/Cabinets-and-Racks/69", image: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=800&q=80" },
      { name: "Copper Systems", url: "https://pvlumens.com/Network-Infrastructure/40/Copper-Systems/70", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80" },
      { name: "Fibre Optic Systems", url: "https://pvlumens.com/Network-Infrastructure/40/Fibre-Optic-Systems/71", image: "https://images.unsplash.com/photo-1742774101928-f7e92a471c1b?w=800&q=80" },
      { name: "ITMS", url: "https://pvlumens.com/Vertiv-Solutions/ITMS.aspx", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
      { name: "Other Infra Products", url: "https://pvlumens.com/Network-Infrastructure/40/Other-Infra-Products/72", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" },
      { name: "Power", url: "https://pvlumens.com/Vertiv-Solutions/Power.aspx", image: "https://images.unsplash.com/photo-1721498273717-7a152d3ec13e?w=800&q=80" },
      { name: "Thermal", url: "https://pvlumens.com/Vertiv-Solutions/Thermal.aspx", image: "https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=800&q=80" },
      { name: "Wire Management", url: "https://pvlumens.com/Network-Infrastructure/40/Wire-Management/73", image: "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?w=800&q=80" },
    ],
  },
  {
    category: "Productivity Solutions",
    slug: "productivity-solutions",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1758543102397-e14b5dfdd8bd?w=800&q=80",
    items: [
      { name: "Barcode Scanners", url: "https://pvlumens.com/Productivity-Solutions/42/Barcode-Scanners/55", image: "https://images.unsplash.com/photo-1758543102397-e14b5dfdd8bd?w=800&q=80" },
      { name: "Mobile Computers", url: "https://pvlumens.com/Productivity-Solutions/42/Mobile-Computers/53", image: "https://images.unsplash.com/photo-1758543102367-da8b00ddf4da?w=800&q=80" },
      { name: "Other Supplies and Support", url: "https://pvlumens.com/Productivity-Solutions/42/Other-Supplies-and-Support/58", image: "https://images.unsplash.com/photo-1758543102397-e14b5dfdd8bd?w=800&q=80" },
      { name: "Printers", url: "https://pvlumens.com/Productivity-Solutions/42/Printers/54", image: "https://images.unsplash.com/photo-1781899710894-f9ecfea088f3?w=800&q=80" },
      { name: "RFID Solutions", url: "https://pvlumens.com/Productivity-Solutions/42/RFID-Solutions/56", image: "https://images.unsplash.com/photo-1642229407672-32411805153f?w=800&q=80" },
      { name: "Software", url: "https://pvlumens.com/Productivity-Solutions/42/Software/57", image: "https://images.unsplash.com/photo-1774901128283-64c62117216a?w=800&q=80" },
      { name: "Tablets", url: "https://pvlumens.com/Productivity-Solutions/42/Tablets/89", image: "https://images.unsplash.com/photo-1621569898825-ef12e7592f94?w=800&q=80" },
    ],
  },
  {
    category: "Safety and Security",
    slug: "safety-and-security",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1549109926-58f039549485?w=800&q=80",
    items: [
      { name: "Access Control", url: "https://pvlumens.com/Safety-and-Security/41/Access-Control/61", image: "https://images.unsplash.com/photo-1697382608786-bcf4c113b86e?w=800&q=80" },
      { name: "Fire Alarm System", url: "https://pvlumens.com/Safety-and-Security/41/Fire-Alarm-System/59", image: "https://images.unsplash.com/photo-1767672857994-73a27b723506?w=800&q=80" },
      { name: "Fire Supression", url: "https://pvlumens.com/Safety-and-Security/41/Fire-Supression/67", image: "https://images.unsplash.com/photo-1625958936686-a9343dc35b5b?w=800&q=80" },
      { name: "Intrusion Alarm", url: "https://pvlumens.com/Safety-and-Security/41/Intrusion-Alarm/63", image: "https://images.unsplash.com/photo-1592933517664-ef7151097c5f?w=800&q=80" },
      { name: "Perimeter Intrusion", url: "https://pvlumens.com/Safety-and-Security/41/Perimeter-Intrusion/76", image: "https://images.unsplash.com/photo-1653039923048-aa285ded90ca?w=800&q=80" },
      { name: "Public Address System", url: "https://pvlumens.com/Safety-and-Security/41/Public-Address-System/62", image: "https://images.unsplash.com/photo-1531104985437-603d6490e6d4?w=800&q=80" },
      { name: "Recording Devices", url: "https://pvlumens.com/Safety-and-Security/41/Recording-Devices/87", image: "https://images.unsplash.com/photo-1622181583573-3ab3c5eb36a0?w=800&q=80" },
      { name: "Storage", url: "https://pvlumens.com/Safety-and-Security/41/Storage/85", image: "https://images.unsplash.com/photo-1584169417032-d34e8d805e8b?w=800&q=80" },
      { name: "Video Surveillence", url: "https://pvlumens.com/Safety-and-Security/41/Video-Surveillence/66", image: "https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?w=800&q=80" },
    ],
  },
  {
    category: "Testing and Measurement",
    slug: "testing-and-measurement",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?w=800&q=80",
    items: [
      { name: "Basic Electrical Testers", url: "https://pvlumens.com/Testing-and-Measurement/11/Basic-Electrical-Testers/14", image: "https://images.unsplash.com/photo-1619345371662-fccc15cc4814?w=800&q=80" },
      { name: "Battery Testing", url: "https://pvlumens.com/Testing-and-Measurement/11/Battery-Testing/77", image: "https://images.unsplash.com/photo-1676337167616-78853693ba3a?w=800&q=80" },
      { name: "Cable Tester and Locator", url: "https://pvlumens.com/Testing-and-Measurement/11/Cable-Tester-and-Locator/82", image: "https://images.unsplash.com/photo-1729549223893-b340db51e577?w=800&q=80" },
      { name: "Earth Testers", url: "https://pvlumens.com/Testing-and-Measurement/11/Earth-Testers/74", image: "https://images.unsplash.com/photo-1553873002-785d775854c9?w=800&q=80" },
      { name: "General Purpose Testers", url: "https://pvlumens.com/Testing-and-Measurement/11/General-Purpose-Testers/81", image: "https://images.unsplash.com/photo-1710194572710-bbd92a2d3f9c?w=800&q=80" },
      { name: "Indoor Air Quality and HVAC", url: "https://pvlumens.com/Testing-and-Measurement/11/Indoor-Air-Quality-and-HVAC/25", image: "https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?w=800&q=80" },
      { name: "Insulation Tester", url: "https://pvlumens.com/Testing-and-Measurement/11/Insulation-Tester/16", image: "https://images.unsplash.com/photo-1564942513760-da4dc8da3d47?w=800&q=80" },
      { name: "Low Resistance Testers", url: "https://pvlumens.com/Testing-and-Measurement/11/Low-Resistance-Testers/78", image: "https://images.unsplash.com/photo-1650420790860-429e356f3194?w=800&q=80" },
      { name: "Motor Tester", url: "https://pvlumens.com/Testing-and-Measurement/11/Motor-Tester/79", image: "https://images.unsplash.com/photo-1563456020111-f02d832ae94c?w=800&q=80" },
      { name: "Power Quality Analysers", url: "https://pvlumens.com/Testing-and-Measurement/11/Power-Quality-Analysers/75", image: "https://images.unsplash.com/photo-1576446470246-499c738d1c8e?w=800&q=80" },
      { name: "Relay Testing", url: "https://pvlumens.com/Testing-and-Measurement/11/Relay-Testing/80", image: "https://images.unsplash.com/photo-1635335874521-7987db781153?w=800&q=80" },
      { name: "Thermal Imager", url: "https://pvlumens.com/Testing-and-Measurement/11/Thermal-Imager/28", image: "https://images.unsplash.com/photo-1670966666594-45d374f6c0ec?w=800&q=80" },
    ],
  },
  {
    category: "UAV Unmanned Aerial Vehicle",
    slug: "uav-unmanned-aerial-vehicle",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1753781467329-416d05e7e477?w=800&q=80",
    items: [
      { name: "Drones", url: "https://pvlumens.com/UAV-Unmanned-Aerial-Vehicle/83/Drones/84", image: "https://images.unsplash.com/photo-1753781467329-416d05e7e477?w=800&q=80" },
    ],
  },
  {
    category: "WIFI and Network Testing",
    slug: "wifi-and-network-testing",
    icon: Wifi,
    image: "https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=800&q=80",
    items: [
      { name: "Copper Cable Testers", url: "https://pvlumens.com/WIFI-and-Network-Testing/38/Copper-Cable-Testers/46", image: "https://images.unsplash.com/photo-1528845922818-cc5462be9a63?w=800&q=80" },
      { name: "Copper Certification", url: "https://pvlumens.com/WIFI-and-Network-Testing/38/Copper-Certification/44", image: "https://images.unsplash.com/photo-1600080404522-0d188a6a7971?w=800&q=80" },
      { name: "Copper Termination Tools", url: "https://pvlumens.com/WIFI-and-Network-Testing/38/Copper-Termination-Tools/45", image: "https://images.unsplash.com/photo-1595428645453-309f41e373e0?w=800&q=80" },
      { name: "Fiber Cabling Tools", url: "https://pvlumens.com/WIFI-and-Network-Testing/38/Fiber-Cabling-Tools/49", image: "https://images.unsplash.com/photo-1587180164414-3ea72d7a4e1a?w=800&q=80" },
      { name: "Fibre Certification", url: "https://pvlumens.com/WIFI-and-Network-Testing/38/Fibre-Certification/47", image: "https://images.unsplash.com/photo-1611071008486-f9d61b062af1?w=800&q=80" },
      { name: "Fibre Optic Testers", url: "https://pvlumens.com/WIFI-and-Network-Testing/38/Fibre-Optic-Testers/48", image: "https://images.unsplash.com/photo-1682561477020-743fbb7fe489?w=800&q=80" },
      { name: "Network Testing", url: "https://pvlumens.com/WIFI-and-Network-Testing/38/Network-Testing/52", image: "https://images.unsplash.com/photo-1489436969537-cf0c1dc69cba?w=800&q=80" },
      { name: "Other Tools and Support", url: "https://pvlumens.com/WIFI-and-Network-Testing/38/Other-Tools-and-Support/50", image: "https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=800&q=80" },
      { name: "Wifi Planning and Testing", url: "https://pvlumens.com/WIFI-and-Network-Testing/38/Wifi-Planning-and-Testing/51", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&q=80" },
    ],
  },
];
