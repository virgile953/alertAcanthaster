"use client";

import Link from "next/link";

export default function Footer() {
	return (
		<footer
			className="
      w-full
      md:w-[calc(100%-200px)]
      md:ml-[200px]
			h-full
      bg-gray-100 dark:bg-gray-800
      p-4
      my-0
      text-sm
      text-gray-600 dark:text-gray-300
      border-t border-gray-200 dark:border-gray-700
      box-border
    "
		>
			<div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
				<div className="flex items-start gap-4">
					<Link
						href="https://github.com/virgile953/alertAcanthaster"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-blue-500 transition-colors"
					>
						GitHub
					</Link>
					<div> | </div>
					<Link
						href="https://www.ecoleleonarddevinci.fr/"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-blue-500 transition-colors"
					>
						École Léonard de Vinci
					</Link>
				</div>
				<div>© {new Date().getFullYear()} AEP95. All rights reserved.</div>
			</div>
		</footer>
	);
}
