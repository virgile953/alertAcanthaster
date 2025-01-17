"use client";

import { useEffect, useState } from "react";
import { getAllSightings } from "../actions/getData";
import Navbar from "../components/Navbar";
import { Sighting } from "../../types";

export default function Data() {
	const [sightings, setSightings] = useState<Sighting[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		const data = await getAllSightings();
		setSightings(data as Sighting[]);
		setLoading(false);
	}

	const exportToCSV = () => {
		const headers = ["Date", "Latitude", "Longitude", "Count", "Certainty"];
		const csvData = sightings.map((s) => [
			new Date(s.createdAt).toLocaleString("en-GB").replace(",", " at"),
			s.latitude,
			s.longitude,
			s.count,
			s.certainty,
		]);

		const csv = [headers, ...csvData].map((row) => row.join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `acanthaster-data-${
			new Date().toISOString().split("T")[0]
		}.csv`;
		a.click();
	};

	return (
		<div className="min-h-screen flex md:flex-row flex-col">
			<Navbar />
			<main className="flex-1 p-4 md:ml-[200px] mt-[80px] md:mt-0">
				{loading ? (
					<p>Loading data...</p>
				) : (
					<div
						style={{
							overflowX: "auto", // For table horizontal scroll on mobile
							width: "100%",
						}}
					>
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<thead>
								<tr>
									<th
										style={{ padding: "8px", borderBottom: "2px solid #ddd" }}
									>
										Date
									</th>
									<th
										style={{ padding: "8px", borderBottom: "2px solid #ddd" }}
									>
										Latitude
									</th>
									<th
										style={{ padding: "8px", borderBottom: "2px solid #ddd" }}
									>
										Longitude
									</th>
									<th
										style={{ padding: "8px", borderBottom: "2px solid #ddd" }}
									>
										Count
									</th>
									<th
										style={{ padding: "8px", borderBottom: "2px solid #ddd" }}
									>
										Certainty
									</th>
								</tr>
							</thead>
							<tbody>
								{sightings.map((sighting) => (
									<tr key={sighting.id}>
										<td
											style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
										>
											{new Date(sighting.createdAt).toLocaleString()}
										</td>
										<td
											style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
										>
											{sighting.latitude}
										</td>
										<td
											style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
										>
											{sighting.longitude}
										</td>
										<td
											style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
										>
											{sighting.count}
										</td>
										<td
											style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
										>
											{sighting.certainty}%
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				<div style={{ marginBottom: "20px" }}>
					<button
						onClick={exportToCSV}
						className="mt-5 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						Export to CSV
					</button>
				</div>
			</main>
		</div>
	);
}
