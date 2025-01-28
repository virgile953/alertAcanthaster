"use server";

import { neon } from "@neondatabase/serverless";

export async function saveSighting(data: {
  latitude: number;
  longitude: number;
  count: number;
  certainty: number;
  thumbsup: number;
  thumbsdown: number;

}) {
  try {
    const sql = neon(process.env.POSTGRES_URL!);
    const sighting = await sql`
      INSERT INTO "Sighting" (latitude, longitude, count, certainty, thumbsup, thumbsdown, "createdAt")
      VALUES (${data.latitude}, ${data.longitude}, ${data.count}, ${data.certainty}, ${data.thumbsup}, ${data.thumbsdown}, NOW())
      RETURNING *
    `;
    return { success: true, data: sighting[0] };
  } catch (error) {
    console.error("Failed to save sighting:", error);
    return { success: false, error: "Failed to save sighting" };
  }
}
