"use client";

import Link from "next/link";

export default function Navbar() {
	const ClassName =
		"bg-white dark:bg-gray-700 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-center w-full";
	return (
		<nav
			className="
					md:w-[200px] md:h-screen
					w-full h-auto fixed top-0
					bg-gray-100 dark:bg-gray-800
					p-5
					flex md:flex-col place-content-between flex-row
					gap-3 items-center md:items-start
					z-10
					"
		>
			<div className="flex flex-row md:flex-col gap-1 sm:gap-2 md:gap-3 w-1/2 md:w-full">
				<Link href="/" className={ClassName}>
					Home
				</Link>
				<Link href="/data" className={ClassName}>
					Data
				</Link>
				<Link href="/about" className={ClassName}>
					About
				</Link>
			</div>
			<div className="flex flex-row md:flex-col gap-1 sm:gap-3 w-1/2 md:w-full md:mb-8">
				<Link href="/login" className={ClassName}>
					Login
				</Link>
				<Link href="/register" className={ClassName}>
					Register
				</Link>
			</div>
		</nav>
	);
}
