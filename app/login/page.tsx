"use client";

import { useState } from "react";
import { login } from "../actions/auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Login() {
	const [userLogin, setUserLogin] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await login(userLogin, password);

		if (result.success) {
			router.push("/");
		} else {
			setError(result.error || "Failed to login");
		}
	};
	const validateInput = () => {
		// Regex for email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		// Regex for FFESSM ID (7 or 8 digits)
		const ffessmIdRegex = /^[A-Z]-?[0-9]{2}-?[0-9]{6}$/;

		if (!emailRegex.test(userLogin) && !ffessmIdRegex.test(userLogin)) {
			setError("Enter a valid email or FFESSM ID");
		} else {
			setError("");
		}
	};

	return (
		<div className="flex gap-0 flex-col md:flex-row min-h-[calc(100vh-89px)] md:min-h-[calc(100vh-53px)] overflow-hidden">
			<Navbar />
			<main className="flex-1 flex flex-col items-center justify-center p-4 md:ml-[200px] mt-[80px] md:mt-0 bg-gray-100 dark:bg-gray-900">
				<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 max-w-full">
					<h1 className="text-2xl mb-6 text-gray-900 dark:text-gray-100">
						Login
					</h1>

					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-gray-700 dark:text-gray-200 mb-2">
								Email / FFESSM ID
							</label>
							<input
								type="text"
								value={userLogin}
								onChange={(e) => setUserLogin(e.target.value)}
								onBlur={validateInput} // Validate only when user leaves the field
								className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
								required
							/>
							{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
						</div>

						<div className="mb-6">
							<label className="block text-gray-700 dark:text-gray-200 mb-2">
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
						>
							Login
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}
