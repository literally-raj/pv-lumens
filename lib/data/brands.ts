import { slugify } from "@/lib/utils";

export interface Brand {
  name: string;
  slug: string;
  url: string;
  logo: string;
  blurb: string;
  category: string | null;
}

// ponytail: blurb/category written from general knowledge, not verified against the brand's
// own site — Hamina and Heinrich are unfamiliar brands so their blurb is intentionally generic.
// Swap in real brand copy once provided.
const RAW_BRANDS: Omit<Brand, "slug">[] = [
  { name: "Atlona", url: "https://pvlumens.com/Atlona/164", logo: "https://pvlumens.com/images/clientIcon/Atlona%20Logo%20-%20160px%20x%2050px.png", blurb: "AV-over-IP switching, matrix and signal extension for enterprise and campus audio-visual installations.", category: "Network Infrastructure" },
  { name: "Axis Communications", url: "https://pvlumens.com/Axis-Communications/147", logo: "https://pvlumens.com/images/clientIcon/Axis_logo.png", blurb: "Pioneer of network video surveillance — IP cameras, encoders and video management software.", category: "Safety and Security" },
  { name: "Checkpoint Systems", url: "https://pvlumens.com/Checkpoint-Systems/168", logo: "https://pvlumens.com/images/clientIcon/Checkpoint-Primary-Logo-Navy-2.png", blurb: "Retail loss-prevention technology — electronic article surveillance and RFID tagging systems.", category: "Safety and Security" },
  { name: "Digifort", url: "https://pvlumens.com/Digifort/155", logo: "https://pvlumens.com/images/clientIcon/digifort_logo1.jpg", blurb: "Video management system (VMS) software for enterprise-scale surveillance networks.", category: "Safety and Security" },
  { name: "Ekahau", url: "https://pvlumens.com/Ekahau/137", logo: "https://pvlumens.com/images/clientIcon/Ekahau.png", blurb: "Wi-Fi site survey, planning and network design tools used by wireless engineers worldwide.", category: "WIFI and Network Testing" },
  { name: "Fluke Networks", url: "https://pvlumens.com/Fluke-Networks/118", logo: "https://pvlumens.com/images/clientIcon/FNet_White_Blue_Box_RGB.JPG", blurb: "Cable certification, fiber inspection and network cabling test equipment.", category: "WIFI and Network Testing" },
  { name: "GST", url: "https://pvlumens.com/GST/152", logo: "https://pvlumens.com/images/clientIcon/GSTimages.png", blurb: "Fire detection and life-safety alarm systems for commercial and industrial facilities.", category: "Safety and Security" },
  { name: "Hamina", url: "https://pvlumens.com/Hamina/169", logo: "https://pvlumens.com/images/clientIcon/HaminaLogo-1.png", blurb: "Technology partner supplying specialized hardware within PV Lumens' distribution portfolio.", category: null },
  { name: "Hanwha Vision", url: "https://pvlumens.com/Hanwha-Vision/165", logo: "https://pvlumens.com/images/clientIcon/Hanwha%20Logo%20-%20160px%20x%2050px.png", blurb: "Network cameras and video surveillance systems, formerly Hanwha Techwin.", category: "Safety and Security" },
  { name: "Heinrich", url: "https://pvlumens.com/Heinrich/161", logo: "https://pvlumens.com/images/clientIcon/Heinrich%20Logo%20-%20160px%20x%2050px.png", blurb: "Technology partner supplying specialized hardware within PV Lumens' distribution portfolio.", category: null },
  { name: "Honeywell", url: "https://pvlumens.com/Honeywell/114", logo: "https://pvlumens.com/images/clientIcon/Honeywell%20-%20Freestanding%20Logo%20Red-EPS%20file.jpg", blurb: "Global technology conglomerate — in this portfolio, known for fire, security and building safety systems.", category: "Safety and Security" },
  { name: "ideaForge", url: "https://pvlumens.com/ideaForge/150", logo: "https://pvlumens.com/images/clientIcon/ideaForgLogo.png", blurb: "Indian manufacturer of unmanned aerial systems for surveying, surveillance and industrial inspection.", category: "UAV Unmanned Aerial Vehicle" },
  { name: "Ivanti Wavelink", url: "https://pvlumens.com/Ivanti-Wavelink/146", logo: "https://pvlumens.com/images/clientIcon/ivanti-wavelink1.png", blurb: "Enterprise mobility and terminal emulation software for rugged mobile computers.", category: "Productivity Solutions" },
  { name: "Megger", url: "https://pvlumens.com/Megger/125", logo: "https://pvlumens.com/images/clientIcon/Megger.png", blurb: "Electrical test instruments — insulation resistance, earth testing and relay test equipment.", category: "Testing and Measurement" },
  { name: "Morley-IAS", url: "https://pvlumens.com/Morley-IAS/115", logo: "https://pvlumens.com/images/clientIcon/Morley_Logo.png", blurb: "Fire alarm control panels and life-safety detection systems.", category: "Safety and Security" },
  { name: "Netally", url: "https://pvlumens.com/Netally/141", logo: "https://pvlumens.com/images/clientIcon/netAlly.png", blurb: "Handheld network testers and Wi-Fi analyzers for field diagnostics and troubleshooting.", category: "WIFI and Network Testing" },
  { name: "Netrack", url: "https://pvlumens.com/Netrack/148", logo: "https://pvlumens.com/images/clientIcon/logo.png", blurb: "Server racks, cabinets and data center enclosure systems.", category: "Network Infrastructure" },
  { name: "Notifier", url: "https://pvlumens.com/Notifier/163", logo: "https://pvlumens.com/images/clientIcon/Notifier%20Logo%20-%20160px%20x%2050px.png", blurb: "Fire alarm detection and notification systems for commercial buildings.", category: "Safety and Security" },
  { name: "Panduit", url: "https://pvlumens.com/Panduit/127", logo: "https://pvlumens.com/images/clientIcon/Panduit-logo01.jpg", blurb: "Structured cabling, connectivity and physical infrastructure for networks and data centers.", category: "Network Infrastructure" },
  { name: "Pioneering Smart Building Automation", url: "https://pvlumens.com/Pioneering-Smart-Building-Automation/166", logo: "https://pvlumens.com/images/clientIcon/Logo%20-%2075F_3.png", blurb: "Smart building automation and HVAC control systems for commercial facilities.", category: "Network Infrastructure" },
  { name: "SUNMI", url: "https://pvlumens.com/SUNMI/162", logo: "https://pvlumens.com/images/clientIcon/Sunmi%20Logo%20-%20160px%20x%2050px.png", blurb: "Android-based smart business devices — POS terminals, handheld computers and payment hardware.", category: "Productivity Solutions" },
  { name: "System Sensor", url: "https://pvlumens.com/System-Sensor/116", logo: "https://pvlumens.com/images/clientIcon/System_Sensor_logo.png", blurb: "Fire and smoke detection sensors and initiating devices.", category: "Safety and Security" },
  { name: "Teledyne Flir", url: "https://pvlumens.com/Teledyne-Flir/131", logo: "https://pvlumens.com/images/clientIcon/TeledyneFLIR2.png", blurb: "Thermal imaging cameras and sensor systems for inspection, security and diagnostics.", category: "Testing and Measurement" },
  { name: "Testo", url: "https://pvlumens.com/Testo/126", logo: "https://pvlumens.com/images/clientIcon/TESTO-img.jpg", blurb: "Precision measurement instruments for temperature, humidity, electrical and HVAC testing.", category: "Testing and Measurement" },
  { name: "Texecom", url: "https://pvlumens.com/Texecom/151", logo: "https://pvlumens.com/images/clientIcon/TexecomLogo300pix.webp", blurb: "Intruder alarm and perimeter security systems.", category: "Safety and Security" },
  { name: "Vertiv", url: "https://pvlumens.com/Vertiv/167", logo: "https://pvlumens.com/images/clientIcon/Vertiv-Logo.svg", blurb: "Power, thermal management and IT infrastructure for data centers, formerly Emerson Network Power.", category: "Network Infrastructure" },
  { name: "Zebra Technologies", url: "https://pvlumens.com/Zebra-Technologies/139", logo: "https://pvlumens.com/images/clientIcon/Zebra.png", blurb: "Barcode scanners, mobile computers, RFID and enterprise asset-tracking hardware.", category: "Productivity Solutions" },
];

export const BRANDS: Brand[] = RAW_BRANDS.map((brand) => ({ ...brand, slug: slugify(brand.name) }));
