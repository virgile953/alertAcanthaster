"use server";

import { neon } from "@neondatabase/serverless";
import { getUser, refreshUser } from "./auth";

export async function updateUserSettings(
	alert: number,
	location: string,
	alert_frequency: number
) {
	try {
		const user = await getUser();
		if (!user) {
			return { success: false, error: "Not authenticated" };
		}

		const sql = neon(process.env.POSTGRES_URL!);
		await sql`
			UPDATE "Users"
			SET alert = ${alert},
					localisation = ${location},
					alert_frequency = ${alert_frequency}
			WHERE id = ${user.userId}
		`;

		// Refresh JWT token with updated user data
		const refreshResult = await refreshUser();
		if (!refreshResult?.success) {
			return { success: false, error: "Failed to refresh session" };
		}

		return { success: true };
	} catch (error) {
		console.error("Failed to update settings:", error);
		return { success: false, error: "Failed to update settings" };
	}
}
