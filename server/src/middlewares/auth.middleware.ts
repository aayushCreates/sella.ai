import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1] as string;
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as {
      userId: string;
    };

    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized - Invalid token" });
  }
};
