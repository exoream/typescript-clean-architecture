import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config();

const secretKey = process.env.SECRET_KEY!;

interface TokenPayload {
  id: string;
  role: string;
  exp?: number;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: TokenPayload;
  }
}

export function createToken(id: string, role: string): string {
  const token = jwt.sign(
    { id, role, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    secretKey,
    { algorithm: "HS256" }
  );

  return token;
}

export function extraToken(req: Request): TokenPayload {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwt.verify(token, secretKey) as TokenPayload;
  const { id, role } = decoded;
  console.log("Decoded Token:", decoded);
  console.log("ID:", id);
  console.log("Role:", role);
  return { id, role };
}

export function jwtMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    console.log("JWT Verification Error:", err ? err.message : "Unknown error");
    console.log("Secret Key:", secretKey);
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user as TokenPayload;
    next();
  });
}
