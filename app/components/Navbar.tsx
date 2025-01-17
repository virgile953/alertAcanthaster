"use client";

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="
      md:w-[200px] md:h-screen md:fixed
      w-full h-auto fixed top-0
      bg-gray-100 dark:bg-gray-800
      p-5
      flex md:flex-col flex-row
      gap-3 items-center md:items-start
      z-10
    ">
      <Link href="/" className="
        bg-white dark:bg-gray-700
        px-4 py-2
        rounded-md
        text-gray-700 dark:text-gray-200
        hover:bg-gray-50 dark:hover:bg-gray-600
        transition-colors
        text-center w-full
      ">
        Home
      </Link>
      <Link href="/about" className="
        bg-white dark:bg-gray-700
        px-4 py-2
        rounded-md
        text-gray-700 dark:text-gray-200
        hover:bg-gray-50 dark:hover:bg-gray-600
        transition-colors
        text-center w-full
      ">
        About
      </Link>
      <Link href="/data" className="
        bg-white dark:bg-gray-700
        px-4 py-2
        rounded-md
        text-gray-700 dark:text-gray-200
        hover:bg-gray-50 dark:hover:bg-gray-600
        transition-colors
        text-center w-full
      ">
        Data
      </Link>
    </nav>
  );
}
