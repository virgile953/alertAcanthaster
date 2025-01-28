"use server";

import { neon } from "@neondatabase/serverless";

export async function updateSightingThumbs(sightingId: number, thumbsUp: boolean) {
  try {
    const sql = neon(process.env.POSTGRES_URL!);
    console.log("sightingId: " + sightingId  + "\nThumb: " + (thumbsUp == true ? "thumbsUp" : "thumbsDown"));

    // Increment or decrement thumbs-up/thumbs-down based on button click
    const column = thumbsUp ? "thumbsup" : "thumbsdown";
    const sqlReq = `
      UPDATE "Sighting"
      SET ${column} = ${column} + 1
      WHERE id = ${sightingId}
      RETURNING *
    `;

    console.log(sqlReq);
    const updatedSighting = await sql(sqlReq)
    return { success: true, data: updatedSighting[0] };
  } catch (error) {
    console.error("Failed to update thumbs:", error);
    return { success: false, error: "Failed to update thumbs" };
  }
}
