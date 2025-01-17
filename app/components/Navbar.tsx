"use client";

import Link from "next/link";

const navLinkStyle = {
	padding: "10px",
	textDecoration: "none",
	color: "#333",
	borderRadius: "4px",
	backgroundColor: "#fff",
};

const navStyle = {
	width: "200px",
	backgroundColor: "#f0f0f0",
	padding: "20px",
	display: "flex",
	flexDirection: "column" as const,
	gap: "10px",
};

export default function Navbar() {
	return (
		<nav style={navStyle}>
			<Link href="/" style={navLinkStyle}>
				Home
			</Link>
			<Link href="/about" style={navLinkStyle}>
				About
			</Link>
			<Link href="/data" style={navLinkStyle}>
				Data
			</Link>
		</nav>
	);
}
