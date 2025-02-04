"use server";

import { neon } from "@neondatabase/serverless";

export async function deleteSighting(id: number) {
	try {
		const sql = neon(process.env.POSTGRES_URL!);
		await sql`
			DELETE FROM "Sighting"
			WHERE id = ${id}
			AND thumbsup = 0
			AND thumbsdown = 0
		`;
		return { success: true };
	} catch (error) {
		console.error("Failed to delete sighting:", error);
		return { success: false, error: "Failed to delete sighting" };
	}
}
