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
		// Set CSS variable for viewport height on mount and resize
		const setVH = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		setVH();
		window.addEventListener('resize', setVH);

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

		return () => window.removeEventListener('resize', setVH);
	}, []);

	if (isLoading) {
		return <div>Loading map...</div>;
	}

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			<Navbar />
			<main className="
				flex-1
				flex
				flex-col
				p-2
				md:p-4
				md:ml-[200px]
				mt-[60px]
				md:mt-0
			">
				<div className="flex-1 w-full">
					<MapComponent position={position} />
				</div>
			</main>
		</div>
	);
}
