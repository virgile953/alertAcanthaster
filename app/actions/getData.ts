"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllSightings() {
	return await prisma.sighting.findMany({
		orderBy: { createdAt: "desc" },
	});
}
