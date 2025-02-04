"use client";

import { useEffect, useState } from "react";
import { getAllSightings } from "../actions/getData";
import Navbar from "../components/Navbar";
import { Sighting } from "../../types";
import { deleteSighting } from "../actions/deleteSighting";

export default function Data() {
	const [sightings, setSightings] = useState<Sighting[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedSightings, setSelectedSightings] = useState<number[]>([]);

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		const data = await getAllSightings();
		setSightings(data as Sighting[]);
		setLoading(false);
	}

	const exportToCSV = () => {
		const headers = [
			"Date",
			"Latitude",
			"Longitude",
			"Count",
			"Certainty",
			"👍",
			"👎",
			"Ratio",
		];
		const csvData = sightings.map((s) => [
			new Date(s.createdAt).toLocaleString("en-GB").replace(",", " at"),
			s.latitude,
			s.longitude,
			s.count,
			s.certainty,
			s.thumbsup,
			s.thumbsdown,
			s.thumbsdown === 0
				? s.thumbsup > 0
					? "100%"
					: "0%"
				: `${((s.thumbsup / (s.thumbsup + s.thumbsdown)) * 100).toFixed(0)}%`,
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

	const handleCheckbox = (id: number) => {
		setSelectedSightings((prev) =>
			prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
		);
	};

	const handleDelete = async () => {
		// Only delete sightings with no votes
		const deletableSightings = sightings.filter(
			(s) =>
				selectedSightings.includes(s.id) &&
				s.thumbsup === 0 &&
				s.thumbsdown === 0
		);

		if (deletableSightings.length === 0) {
			alert("Cannot delete sightings with votes");
			return;
		}

		// Add delete API call here
		await Promise.all(deletableSightings.map((s) => deleteSighting(s.id)));
		await loadData(); // Refresh data
		setSelectedSightings([]); // Clear selection
	};

	return (
		<div className="flex md:flex-row flex-col min-h-[calc(100vh-64px)]">
			<Navbar />
			<main className="flex-1 p-4 pb-16 md:ml-[200px] mt-[80px] md:mt-0 overflow-y-auto">
				{loading ? (
					<p>Loading data...</p>
				) : (
					<div className="flex flex-col">
						<div className="flex-1 overflow-x-auto mb-4">
							<table style={{ width: "100%", borderCollapse: "collapse" }}>
								<thead>
									<tr>
										<th
											style={{ padding: "8px", borderBottom: "2px solid #ddd" }}
										>
											Select
										</th>
										{[
											"Date",
											"Latitude",
											"Longitude",
											"Count",
											"Certainty",
											"👍",
											"👎",
											"Ratio",
										].map((header) => (
											<th
												key={header}
												style={{
													padding: "8px",
													borderBottom: "2px solid #ddd",
												}}
											>
												{header}
											</th>
										))}
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
											>
												<input
													type="checkbox"
													checked={selectedSightings.includes(sighting.id)}
													onChange={() => handleCheckbox(sighting.id)}
													disabled={
														sighting.thumbsup > 0 || sighting.thumbsdown > 0
													}
													className="w-4 h-4"
												/>
											</td>
											<td
												style={{
													padding: "8px",
													borderBottom: "1px solid #ddd",
												}}
												title={new Date(sighting.createdAt).toLocaleString(
													"en-GB"
												)}
											>
												{new Date(sighting.createdAt).toLocaleDateString(
													"en-GB"
												)}
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
											<td
												style={{
													padding: "8px",
													borderBottom: "1px solid #ddd",
												}}
											>
												{sighting.thumbsup}
											</td>
											<td
												style={{
													padding: "8px",
													borderBottom: "1px solid #ddd",
												}}
											>
												{sighting.thumbsdown}
											</td>
											<td
												style={{
													padding: "8px",
													borderBottom: "1px solid #ddd",
												}}
											>
												{sighting.thumbsdown === 0
													? sighting.thumbsup > 0
														? "100%"
														: "0%"
													: `${(
															(sighting.thumbsup /
																(sighting.thumbsup + sighting.thumbsdown)) *
															100
													  ).toFixed(0)}%`}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="flex gap-4">
							{selectedSightings.length > 0 && (
								<button
									onClick={handleDelete}
									className="px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
								>
									Delete Selected ({selectedSightings.length})
								</button>
							)}
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
