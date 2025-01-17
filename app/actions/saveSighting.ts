"use server";

import { neon } from "@neondatabase/serverless";

export async function saveSighting(data: {
  latitude: number;
  longitude: number;
  count: number;
  certainty: number;
}) {
  try {
    const sql = neon(process.env.POSTGRES_URL!);
    const sighting = await sql`
      INSERT INTO "Sighting" (latitude, longitude, count, certainty, "createdAt")
      VALUES (${data.latitude}, ${data.longitude}, ${data.count}, ${data.certainty}, NOW())
      RETURNING *
    `;
    return { success: true, data: sighting[0] };
  } catch (error) {
    console.error("Failed to save sighting:", error);
    return { success: false, error: "Failed to save sighting" };
  }
}
