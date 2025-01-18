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
		<div className="flex md:flex-row flex-col min-h-[calc(100vh-64px)]">
			<Navbar />
			<main className="flex-1 p-4 pb-16 md:ml-[200px] mt-[80px] md:mt-0 overflow-y-auto">
				{loading ? (
					<p>Loading data...</p>
				) : (
					<div className="flex flex-col ">
						<div className="flex-1 overflow-x-auto mb-4">
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
												style={{
													padding: "8px",
													borderBottom: "1px solid #ddd",
												}}
												title={new Date(sighting.createdAt).toLocaleString('en-GB')}
											>
												{new Date(sighting.createdAt).toLocaleDateString('en-GB')}
											</td>
											<td
												style={{
													padding: "8px",
													borderBottom: "1px solid #ddd",
												}}
											>
												{sighting.latitude.toFixed(7)}
											</td>
											<td
												style={{
													padding: "8px",
													borderBottom: "1px solid #ddd",
												}}
											>
												{sighting.longitude.toFixed(7)}
											</td>
											<td
												style={{
													padding: "8px",
													borderBottom: "1px solid #ddd",
												}}
											>
												{sighting.count}
											</td>
											<td
												style={{
													padding: "8px",
													borderBottom: "1px solid #ddd",
												}}
											>
												{sighting.certainty}%
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="mb-2">
							<button
								onClick={exportToCSV}
								className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
							>
								Export to CSV
							</button>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
