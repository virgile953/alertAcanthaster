"use server";

import { neon } from "@neondatabase/serverless";

export async function updateSightingThumbs(
	sightingId: number,
	thumbsUp: boolean,
	removing: boolean = false
) {
	try {
		const sql = neon(process.env.POSTGRES_URL!);
		const column = thumbsUp ? "thumbsup" : "thumbsdown";
		const otherColumn = thumbsUp ? "thumbsdown" : "thumbsup";

		// Remove previous vote and add new one if switching votes
		if (!removing) {
			const sqlReq = `
				UPDATE "Sighting"
				SET ${column} = ${column} + 1,
						${otherColumn} = GREATEST(${otherColumn} - 1, 0)
				WHERE id = ${sightingId}
				RETURNING *
			`;
			const updatedSighting = await sql(sqlReq);
			return { success: true, data: updatedSighting[0] };
		}

		// Remove vote if clicking same button again
		const sqlReq = `
			UPDATE "Sighting"
			SET ${column} = GREATEST(${column} - 1, 0)
			WHERE id = ${sightingId}
			RETURNING *
		`;
		const updatedSighting = await sql(sqlReq);
		return { success: true, data: updatedSighting[0] };
	} catch (error) {
		console.error("Failed to update thumbs:", error);
		return { success: false, error: "Failed to update thumbs" };
	}
}
