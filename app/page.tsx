"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

const MapComponent = dynamic(() => import("./components/MapComponent"), {
	loading: () => <p>Loading Map...</p>,
	ssr: false,
});

export default function Home() {
	const [position, setPosition] = useState<[number, number]>([0, 0]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					setPosition([pos.coords.latitude, pos.coords.longitude]);
					setIsLoading(false);
				},
				() => {
					setPosition([51.505, -0.09]);
					setIsLoading(false);
				}
			);
		}
	}, []);

	if (isLoading) {
		return <div>Loading map...</div>;
	}

	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<Navbar />
			<main
				style={{
					flex: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: "20px",
				}}
			>
				<MapComponent position={position} />
			</main>
		</div>
	);
}
