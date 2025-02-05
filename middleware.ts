import { NextResponse } from "next/server";
import { getUser } from "./app/actions/auth";

export async function middleware(request: Request) {
	const user = await getUser();
	const protectedPaths = ["/data", "/settings"];

	// Check if current path is protected
	const isProtectedPath = protectedPaths.some((path) =>
		request.url.includes(path)
	);

	if (!user && isProtectedPath) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
