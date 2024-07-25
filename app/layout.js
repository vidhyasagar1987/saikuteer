import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sai Kuteer",
  description: "Property Listing Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
        <div className="fixed bottom-0 right-0 z-[9999] p-4">
        <Toaster />
      </div>
      </body>
    </html>
  );
}
