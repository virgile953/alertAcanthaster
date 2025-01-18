import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
	title: "Alert-Acanthaster",
	description: "App for reporting Acanthaster sightings",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex flex-col min-h-screen">
				{children}
				<Footer />
			</body>
		</html>
	);
}
