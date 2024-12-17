/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    const decodedToken: any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
