import { Request, Response } from "express";
import { WalletService } from "../services/wallet.services";

export class WalletController {
  private walletService: WalletService;
  constructor() {
    this.walletService = new WalletService();
  }

  async getWalletBalance(req: Request, res: Response) {
    try {
      const { userId } = req.query;

      const wallet = await this.walletService.getWalletBalance(userId);
      res.status(200).json({ success: true, wallet });
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

  async updateWalletBalance(req: Request, res: Response) {
    try {
      const { userId, balance } = req.body;

      await this.walletService.updateWalletBalance(userId, balance as number);
      res.status(200).json({
        success: true,
        message: "Wallet balance updated successfully",
      });
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
