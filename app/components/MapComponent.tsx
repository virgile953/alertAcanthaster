"use client";

import { useState, useEffect } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";
import { LatLng } from "leaflet";
import { getAllSightings } from "../actions/getData";
import { saveSighting } from "../actions/saveSighting";
import { Sighting } from "@/types";
import 'leaflet/dist/leaflet.css';
import MapPopup from "./MapPopup";

function ClickHandler({ onSightingAdded }: { onSightingAdded: () => void }) {
	const [clickPos, setClickPos] = useState<LatLng | null>(null);
	const [count, setCount] = useState("");
	const [certainty, setCertainty] = useState("");

	useMapEvents({
		click(e) {
			setClickPos(e.latlng);
		},
	});

	const handleSubmit = async () => {
		const result = await saveSighting({
			latitude: clickPos!.lat,
			longitude: clickPos!.lng,
			count: Number(count),
			certainty: Number(certainty),
			thumbsup: Number(1),
			thumbsdown: Number(0),
		});

		if (result.success) {
			setClickPos(null);
			setCount("");
			setCertainty("");
			onSightingAdded(); // Trigger refresh
		}
	};

	return clickPos ? (
		<Popup position={clickPos}>
			<div style={{ padding: "10px" }}>
				<div style={{ marginBottom: "10px" }}>
					<label>How many were there?</label>
					<input
						type="number"
						value={count}
						onChange={(e) => setCount(e.target.value)}
						style={{ width: "100%", marginTop: "5px" }}
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Certainty (1-100)</label>
					<input
						type="range"
						min="1"
						max="100"
						value={certainty}
						onChange={(e) => setCertainty(e.target.value)}
						style={{ width: "100%" }}
					/>
					<span>{certainty}%</span>
				</div>
				<button
					onClick={handleSubmit}
					className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Submit
				</button>
			</div>
		</Popup>
	) : null;
}

export default function MapComponent({
	position,
}: {
	position: [number, number];
}) {
	const [sightings, setSightings] = useState<Sighting[]>([]);
	const [refresh, setRefresh] = useState(0);

	useEffect(() => {
		const loadSightings = async () => {
			const data = await getAllSightings();
			setSightings(data as Sighting[]);
		};
		loadSightings();
	}, [refresh]); // Reload when refresh changes

	const handleSightingAdded = () => {
		setRefresh((prev) => prev + 1); // Trigger reload
	};

	return (//min-h-[calc(100vh-64px)]
		<div className="h-[calc(79vh)] md:h-[calc(90vh)] w-full">
			<MapContainer
				center={position}
				zoom={13}
				className="w-full h-full rounded-lg border-2 border-gray-200 dark:border-gray-700"
				style={{ height: '100%' }}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{sightings.map((sighting) => (
					<Marker
						key={sighting.id}
						position={[sighting.latitude, sighting.longitude]}
					>
						<MapPopup sighting={sighting} />
					</Marker>
				))}
				<ClickHandler onSightingAdded={handleSightingAdded} />
			</MapContainer>
		</div>
	);
}

