"use server";

import { Sighting } from "@/types";
import { neon } from "@neondatabase/serverless";

async function createTableIfNotExists() {
	const sql = neon(process.env.POSTGRES_URL!);
	await sql`
		CREATE TABLE IF NOT EXISTS "Sighting" (
			id SERIAL PRIMARY KEY,
			latitude DOUBLE PRECISION NOT NULL,
			longitude DOUBLE PRECISION NOT NULL,
			count INTEGER NOT NULL,
			certainty INTEGER NOT NULL,
			thumbsup INTEGER DEFAULT 0,
			thumbsdown INTEGER DEFAULT 0,
			"createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		)
	`;
}

export async function getAllSightings(): Promise<Sighting[]> {
	try {
		const sql = neon(process.env.POSTGRES_URL!);
		const sightings = await sql`
	  SELECT * FROM "Sighting"
	  ORDER BY "createdAt" DESC
	`;
		return sightings as Sighting[];
	} catch (error) {
		await createTableIfNotExists();
		console.error("Error fetching sightings:", error);
		console.log("retrying");
		try {
			const sql = neon(process.env.POSTGRES_URL!);
			const sightings = await sql`
        SELECT * FROM "Sighting"
        ORDER BY "createdAt" DESC
      `;
			return sightings as Sighting[];
		} catch (error) {
			console.error("Error fetching sightings:", error);
			return [];
		}
		return [];
	}
}
