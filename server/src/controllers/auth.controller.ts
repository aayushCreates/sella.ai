import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        ...result,
      });
    } catch (error: any) {
      if (error.message === "User with this email already exists") {
        return res.status(409).json({ success: false, message: error.message });
      }
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Email and password are required" });
      }

      const result = await authService.login({ email, password });

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        ...result,
      });
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        return res.status(401).json({ success: false, message: error.message });
      }
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        success: true,
        message:
          "Logged out successfully. Please remove the token on the client side.",
      });
    } catch (error) {
      next(error);
    }
  },

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await authService.getUserById(req.user.userId);

      return res.status(200).json({
        success: true,
        message: "User authenticated successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};
