import { jwtVerify, SignJWT } from "jose";
import { AuthUser, UserTypes } from "./types";
import { cookieNameMap } from "../middleware";

const encoder = new TextEncoder();

// Helper function to verify JWT
export async function verifyJWT(
  token: string,
  userType: UserTypes,
): Promise<AuthUser> {
  const secret = encoder.encode(cookieNameMap[userType].cookieName);

  try {
    return (await jwtVerify<AuthUser>(token, secret)).payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

// Helper function to decode JWT payload
export async function signJWT(
  payload: AuthUser,
  secret: string,
  expiresIn: string = "6h",
): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .setIssuedAt()
    .setNotBefore("0s")
    .sign(encoder.encode(secret));

  return jwt;
}
