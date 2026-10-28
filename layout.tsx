import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "NexoraShop — технологии и стиль",
 description: "Электроника, аксессуары и одежда в современном интернет-магазине NexoraShop.",
 openGraph: { title: "NexoraShop — технологии и стиль", description: "Электроника, аксессуары и одежда", type: "website" }
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="ru"><body>{children}</body></html>;
}
