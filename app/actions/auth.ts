"use server";

import { neon } from "@neondatabase/serverless";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Generate a secure key using Web Crypto API
const JWT_SECRET = new TextEncoder().encode(
	process.env.JWT_SECRET || "default-secret"
);

async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hash = await crypto.subtle.digest("SHA-256", data);
	return Buffer.from(hash).toString("hex");
}

async function verifyPassword(
	password: string,
	hash: string
): Promise<boolean> {
	const hashedInput = await hashPassword(password);
	return hashedInput === hash;
}

export async function createUser(
	ffessm_id: string,
	email: string | null,
	password: string
) {
	try {
		const sql = neon(process.env.POSTGRES_URL!);

		if (!/^[A-Z]-?[0-9]{2}-?[0-9]{6}$/.test(ffessm_id)) {
			return {
				success: false,
				error: "Invalid FFESSM ID format",
			};
		}

		// Check if user already exists
		const existingUser = await sql`
			SELECT ffessm_id, email
			FROM "Users"
			WHERE ffessm_id = ${ffessm_id}
			OR (email = ${email} AND email IS NOT NULL)
		`;

		if (existingUser.length > 0) {
			if (existingUser[0].ffessm_id === ffessm_id) {
				return {
					success: false,
					error: "FFESSM ID already registered",
				};
			}
			if (email && existingUser[0].email === email) {
				return {
					success: false,
					error: "Email already registered",
				};
			}
		}

		// Validate password
		if (password.length < 8) {
			return {
				success: false,
				error: "Password must be at least 8 characters",
			};
		}

		const hashedPassword = await hashPassword(password);

		const user = await sql`
			INSERT INTO "Users" (ffessm_id, email, password)
			VALUES (${ffessm_id}, ${email}, ${hashedPassword})
			RETURNING id, ffessm_id, email, alert
		`;

		return {
			success: true,
			user: user[0],
		};
	} catch (error) {
		console.error("Failed to create user:", error);
		return {
			success: false,
			error: "Failed to create user",
		};
	}
}

export async function login(ffessm_id: string, password: string) {
	try {
		const sql = neon(process.env.POSTGRES_URL!);
		const users = await sql`
			SELECT * FROM "Users"
			WHERE ffessm_id = ${ffessm_id}
			OR (email = ${ffessm_id} AND email IS NOT NULL)
		`;

		const user = users[0];
		if (!user) {
			return { success: false, error: "User not found" };
		}

		const passwordMatch = await verifyPassword(password, user.password);
		if (!passwordMatch) {
			return { success: false, error: "Invalid password" };
		}

		const token = await new SignJWT({
			userId: user.id,
			ffessmId: user.ffessm_id,
			alert: user.alert,
			location: user.localisation,
			alert_frequency: user.alert_frequency,
			alert_time_sent: user.alert_time_sent,
		})
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime("24h")
			.sign(JWT_SECRET);

		(await cookies()).set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 86400, // 24 hours
		});

		return {
			success: true,
			user: {
				id: user.id,
				ffessm_id: user.ffessm_id,
				email: user.email,
				alert: user.alert,
				location: user.localisation,
				alert_frequency: user.alert_frequency,
				alert_time_sent: user.alert_time_sent,
			},
		};
	} catch (error) {
		console.error("Failed to login:", error);
		return { success: false, error: "Failed to login" };
	}
}

export async function getUser() {
	try {
		const token = (await cookies()).get("token");

		if (!token) {
			return null;
		}

		const verified = await jwtVerify(token.value, JWT_SECRET);
		return verified.payload;
	} catch (error) {
		console.error("Failed to verify token:", error);
		return null;
	}
}

interface JWTUserPayload {
	userId: number;
	ffessmId: string;
	alert: boolean;
	location: string;
	alert_frequency: string;
	alert_time_sent: string;
}

export async function refreshUser() {
	try {
		const oldToken = (await cookies()).get("token");
		if (!oldToken) {
			return null;
		}
		const verified = await jwtVerify(oldToken.value, JWT_SECRET);

		const sql = neon(process.env.POSTGRES_URL!);
		const users = await sql`
			SELECT * FROM "Users"
			WHERE id = ${(verified.payload as unknown as JWTUserPayload).userId}
		`;

		const user = users[0];
		if (!user) {
			return { success: false, error: "User not found" };
		}

		const token = await new SignJWT({
			userId: user.id,
			ffessmId: user.ffessm_id,
			alert: user.alert,
			location: user.localisation,
			alert_frequency: user.alert_frequency,
			alert_time_sent: user.alert_time_sent,
		})
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime("24h")
			.sign(JWT_SECRET);

		(await cookies()).delete("token");
		(await cookies()).set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 86400, // 24 hours
		});

		return {
			success: true,
			user: {
				id: user.id,
				ffessm_id: user.ffessm_id,
				email: user.email,
				alert: user.alert,
				location: user.localisation,
				alert_frequency: user.alert_frequency,
				alert_time_sent: user.alert_time_sent,
			},
		};
	} catch (error) {
		console.error("Failed to refresh user: ", error);
		return { success: false, error: "Failed to refresh data" };
	}
}

export async function logout() {
	const cookieStore = cookies();
	(await cookieStore).delete("token");
	return { success: true };
}
