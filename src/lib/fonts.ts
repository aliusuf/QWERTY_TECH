import localFont from "next/font/local";
import { Chivo_Mono } from "next/font/google";

export const interDisplay = localFont({
  src: [
    { path: "../fonts/InterDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/InterDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/InterDisplay-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/InterDisplay-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-mono-alt",
  display: "swap",
});
