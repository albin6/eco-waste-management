import { Request, Response } from "express";
import { TransactionServices } from "../services/transaction.services";

export class TransactionController {
  private transactionServices: TransactionServices;
  constructor() {
    this.transactionServices = new TransactionServices();
  }
  async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { transactionId, userId, to, amount, transactionType } = req.body;
      console.log("amount =>", amount);

      await this.transactionServices.createTransaction({
        transactionId,
        userId,
        to,
        amount,
        transactionType,
        date: new Date(),
      });

      res.status(201).json({
        message: "Transaction recorded successfully",
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserTransactions(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      const transactions = await this.transactionServices.getTransactions(
        userId
      );
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
