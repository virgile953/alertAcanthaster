"use client";

import { useState } from "react";
import { createUser } from "../actions/auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Register() {
	const [ffessmId, setFfessmId] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		const result = await createUser(ffessmId, email || null, password);

		if (result.success) {
			router.push("/login");
		} else {
			setError(result.error || "Failed to register");
		}
	};

	return (
		<div className="flex gap-0 flex-col md:flex-row min-h-[calc(100vh-89px)] md:min-h-[calc(100vh-53px)] overflow-hidden">
			<Navbar />
			<main className="flex-1 flex flex-col items-center justify-center p-4 md:ml-[200px] mt-[80px] md:mt-0 bg-gray-100 dark:bg-gray-900">
				<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 max-w-full">
					<h1 className="text-2xl mb-6 text-gray-900 dark:text-gray-100">
						Register
					</h1>

					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-gray-700 dark:text-gray-200 mb-2">
								FFESSM ID*
							</label>
							<input
								type="text"
								value={ffessmId}
								onChange={(e) => setFfessmId(e.target.value)}
								className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 dark:text-gray-200 mb-2">
								Email (optional)
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 dark:text-gray-200 mb-2">
								Password*
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
								required
							/>
						</div>

						<div className="mb-6">
							<label className="block text-gray-700 dark:text-gray-200 mb-2">
								Confirm Password*
							</label>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
						>
							Register
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}
