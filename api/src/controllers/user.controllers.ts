import { Request, Response } from "express";
import { UserServices } from "../services/user.services";
import { User } from "../types/User";

export class UserController {
  private userService: UserServices;
  constructor() {
    this.userService = new UserServices();
  }

  async createNewUser(req: Request, res: Response) {
    try {
      const user = req.body as User;

      await this.userService.createNewUser(user);

      res
        .status(200)
        .json({ success: true, message: "User Created Successfully" });
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = (error as any).status || 500; // Ensure status exists
        res.status(statusCode).json({
          success: false,
          message: error.message || "Internal Server Error",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred",
        });
      }
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      const user = await this.userService.loginUser({ email, password });

      res.status(200).json({ success: true, user });
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = (error as any).status || 500; // Ensure status exists
        res.status(statusCode).json({
          success: false,
          message: error.message || "Internal Server Error",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred",
        });
      }
    }
  }

  async getUserDetails(req: Request, res: Response) {
    try {
      const { id } = req.body as { id: any };

      const user = await this.userService.getUserDetails(id);

      res.status(200).json({ success: true, user });
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = (error as any).status || 500; // Ensure status exists
        res.status(statusCode).json({
          success: false,
          message: error.message || "Internal Server Error",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred",
        });
      }
    }
  }
}
