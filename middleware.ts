import { NextResponse } from "next/server";
import { getUser } from "./app/actions/auth";

export async function middleware(request: Request) {
	const user = await getUser();
	console.log("User:", user);
	if (
		!user &&
		!request.url.includes("/login") &&
		!request.url.includes("/register")
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
