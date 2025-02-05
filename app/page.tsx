"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

const MapComponent = dynamic(() => import("./components/MapComponent"), {
	loading: () => <p className="h-full w-full bg-white">Loading Map...</p>,
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
		} else {
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="flex gap-0 flex-col md:flex-row min-h-[calc(100vh-89px)] md:min-h-[calc(100vh-53px)] overflow-hidden">
			<Navbar />
			<main className="flex-1 flex flex-col gap-0 p-0 md:p-0 md:ml-[200px] mt-[80px] md:mt-0">
				<div className="flex-1 w-full h-[calc(100% - 52px)] bg-gray-100 dark:bg-gray-800">
					{isLoading ? (
						<div className="h-full w-full">
							<div className="h-full w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg border-2 border-gray-200 dark:border-gray-700">
								<div className="h-full w-full bg-gradient-to-r from-transparent via-gray-200/10 dark:via-gray-700/10 to-transparent animate-shimmer"></div>
							</div>
						</div>
					) : (
						<MapComponent position={position} />
					)}
				</div>
			</main>
		</div>
	);
}
