"use client";

import Link from "next/link";

export default function Navbar() {
	const ClassName =
		"bg-white dark:bg-gray-700 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-center w-full";
	return (
		<nav
			className="
					md:w-[200px] md:h-screen md:fixed
					w-full h-auto fixed top-0
					bg-gray-100 dark:bg-gray-800
					p-5
					mb-4 md:mb-0
					flex md:flex-col flex-row
					gap-3 items-center md:items-start
					z-10
					"
		>
			<Link href="/" className={ClassName}>
				Home
			</Link>
			<Link href="/data" className={ClassName}>
				Data
			</Link>
			<Link href="/about" className={ClassName}>
				About
			</Link>
		</nav>
	);
}
