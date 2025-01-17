"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveSighting(data: {
	latitude: number;
	longitude: number;
	count: number;
	certainty: number;
}) {
	try {
		const sighting = await prisma.sighting.create({
			data: {
				latitude: data.latitude,
				longitude: data.longitude,
				count: data.count,
				certainty: data.certainty,
			},
		});
		return { success: true, data: sighting };
	} catch (error) {
		console.error("Failed to save sighting:", error);
		return { success: false, error: "Failed to save sighting" };
	}
}
