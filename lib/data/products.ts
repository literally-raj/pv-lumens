export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image?: string;
}

// ponytail: placeholder catalog — swap for the real product feed once provided.
// Images reused from lib/data/solutions.ts item photos until real product photography is provided.
export const PRODUCTS: Product[] = [
  { id: "1", name: "24-Port Managed Switch", brand: "Panduit", category: "Network Infrastructure", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80" },
  { id: "2", name: "42U Server Rack Enclosure", brand: "Netrack", category: "Network Infrastructure", image: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=800&q=80" },
  { id: "3", name: "IP Dome Camera", brand: "Axis Communications", category: "Safety and Security", image: "https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?w=800&q=80" },
  { id: "4", name: "Addressable Fire Panel", brand: "Notifier", category: "Safety and Security", image: "https://images.unsplash.com/photo-1767672857994-73a27b723506?w=800&q=80" },
  { id: "5", name: "Rugged Mobile Computer", brand: "Zebra Technologies", category: "Productivity Solutions", image: "https://images.unsplash.com/photo-1758543102367-da8b00ddf4da?w=800&q=80" },
  { id: "6", name: "Android POS Terminal", brand: "SUNMI", category: "Productivity Solutions", image: "https://images.unsplash.com/photo-1621569898825-ef12e7592f94?w=800&q=80" },
  { id: "7", name: "Insulation Resistance Tester", brand: "Megger", category: "Testing and Measurement", image: "https://images.unsplash.com/photo-1564942513760-da4dc8da3d47?w=800&q=80" },
  { id: "8", name: "Thermal Imaging Camera", brand: "Teledyne Flir", category: "Testing and Measurement", image: "https://images.unsplash.com/photo-1670966666594-45d374f6c0ec?w=800&q=80" },
  { id: "9", name: "Mapping & Surveying Drone", brand: "ideaForge", category: "UAV Unmanned Aerial Vehicle", image: "https://images.unsplash.com/photo-1753781467329-416d05e7e477?w=800&q=80" },
  { id: "10", name: "Fiber Optic Certifier", brand: "Fluke Networks", category: "WIFI and Network Testing", image: "https://images.unsplash.com/photo-1611071008486-f9d61b062af1?w=800&q=80" },
  { id: "11", name: "Wi-Fi Site Survey Kit", brand: "Ekahau", category: "WIFI and Network Testing", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&q=80" },
  { id: "12", name: "Rack PDU, 16-Outlet", brand: "Vertiv", category: "Network Infrastructure", image: "https://images.unsplash.com/photo-1721498273717-7a152d3ec13e?w=800&q=80" },
];
