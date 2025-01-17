import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Alert-Acanthaster",
  description: "App for reporting Acanthaster sightings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light dark:dark">
      <body className="bg-white dark:bg-gray-900">
        {children}
      </body>
    </html>
  )
}
