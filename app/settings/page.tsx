"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { updateUserSettings } from "../actions/updateSettings";
import { getUser } from "../actions/auth";

export default function Settings() {
	const [notificationPreference, setNotificationPreference] =
		useState<number>(0);
	const [manualLat, setManualLat] = useState("");
	const [manualLng, setManualLng] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [lastNotificationSent, setLastNotificationSent] = useState<string>("");
	const [alertFrequency, setAlertFrequency] = useState<number>(24);

	useEffect(() => {
		const loadUserSettings = async () => {
			const user = await getUser();
			if (user) {
				setNotificationPreference(Number(user.alert) || 0);
				setAlertFrequency(Number(user.alert_frequency) || 24);
				if (user.alert_time_sent && user.alert_time_sent !== "") {
					setLastNotificationSent(
						new Date(user.alert_time_sent as string).toLocaleString()
					);
				}
				const savedLocation = user.location as string;
				console.log("Saved location:", savedLocation);
				if (savedLocation) {
					setManualLat(savedLocation.split(";")[0]);
					setManualLng(savedLocation.split(";")[1]);
				}
			}
		};
		loadUserSettings();
	}, []);

	const handleDeviceLocation = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					setManualLat(pos.coords.latitude.toString());
					setManualLng(pos.coords.longitude.toString());
				},
				(err) => {
					setError("Failed to get device location: " + err.message);
				}
			);
		}
	};

	const handleSave = async () => {
		if (!location) {
			setError("Please set a location");
			return;
		}

		const result = await updateUserSettings(
			notificationPreference,
			`${manualLat};${manualLng}`,
			alertFrequency
		);

		if (result.success) {
			setError("");
			setSuccess("Settings saved successfully");
			// Reload user settings
			const user = await getUser();
			if (user) {
				setNotificationPreference(Number(user.alert) || 0);
				setAlertFrequency(Number(user.alert_frequency) || 24);
				if (user.alert_time_sent && user.alert_time_sent !== "") {
					setLastNotificationSent(
						new Date(user.alert_time_sent as string).toLocaleString()
					);
				}
				const savedLocation = user.location as string;
				if (savedLocation) {
					setManualLat(savedLocation.split(";")[0]);
					setManualLng(savedLocation.split(";")[1]);
				}
			}
		} else {
			setError(result.error || "Failed to save settings");
		}
	};

	return (
		<div className="flex gap-0 flex-col md:flex-row min-h-[calc(100vh-89px)] md:min-h-[calc(100vh-53px)] overflow-hidden">
			<Navbar />
			<main className="flex-1 flex flex-col items-center justify-center p-4 md:ml-[200px] mt-[80px] md:mt-0 bg-gray-100 dark:bg-gray-900">
				<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 max-w-full">
					<h1 className="text-2xl mb-6 text-gray-900 dark:text-gray-100">
						Settings
					</h1>

					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
							{error}
						</div>
					)}
					{success && (
						<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
							{success}
						</div>
					)}

					<div className="mb-6">
						<label className="block text-gray-700 dark:text-gray-200 mb-2">
							Notifications
						</label>
						<select
							value={notificationPreference}
							onChange={(e) =>
								setNotificationPreference(Number(e.target.value))
							}
							className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
						>
							<option value={0}>No notifications</option>
							<option value={1}>Email only</option>
							<option value={2}>Push notifications only</option>
							<option value={3}>Email and push notifications</option>
						</select>
					</div>
					<div className="flex flex-row justify-between gap-4">
						<div className="mb-2 w-full">
							<label className=" text-gray-700 dark:text-gray-200 mb-2">
								Latitude
							</label>
							<input
								type="text"
								value={manualLat}
								onChange={(e) => setManualLat(e.target.value)}
								className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>

						<div className="mb-2 w-full">
							<label className=" text-gray-700 dark:text-gray-200 mb-2">
								Longitude
							</label>
							<input
								type="text"
								value={manualLng}
								onChange={(e) => setManualLng(e.target.value)}
								className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>
					</div>
					<div className="flex gap-4 mb-6">
						<button
							onClick={handleDeviceLocation}
							className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Use Device Location
						</button>
					</div>

					<div className="mb-6">
						<label className="block text-gray-700 dark:text-gray-200 mb-2">
							Notification Frequency (hours)
						</label>
						<input
							type="number"
							min="1"
							max="168"
							value={alertFrequency}
							onChange={(e) => setAlertFrequency(Number(e.target.value))}
							className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
						/>
					</div>

					{lastNotificationSent && (
						<div className="mb-6">
							<label className="block text-gray-700 dark:text-gray-200 mb-2">
								Last Notification Sent
							</label>
							<div className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
								{lastNotificationSent}
							</div>
						</div>
					)}

					<button
						onClick={handleSave}
						className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
					>
						Save Settings
					</button>
				</div>
			</main>
		</div>
	);
}
