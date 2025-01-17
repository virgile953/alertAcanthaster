"use client";

import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { saveSighting } from "../actions/saveSighting";

function ClickHandler() {
	const [clickPos, setClickPos] = useState<LatLng | null>(null);
	const [count, setCount] = useState("");
	const [certainty, setCertainty] = useState("");

	useMapEvents({
		click(e) {
			setClickPos(e.latlng);
		},
	});

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
					onClick={async () => {
						const result = await saveSighting({
							latitude: clickPos.lat,
							longitude: clickPos.lng,
							count: Number(count),
							certainty: Number(certainty),
						});
						if (result.success) {
							setClickPos(null);
							setCount("");
							setCertainty("");
						}
					}}
					style={{
						width: "100%",
						padding: "5px",
						backgroundColor: "#007bff",
						color: "white",
						border: "none",
						borderRadius: "4px",
					}}
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
	return (
		<MapContainer
			center={position}
			zoom={13}
			style={{
				height: "100%",
				width: "100%",
				border: "2px solid #ccc",
				borderRadius: "8px",
			}}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<ClickHandler />
		</MapContainer>
	);
}
