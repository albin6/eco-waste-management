import { TransactionModel } from "../models/transaction.model";
import { Transaction } from "../types/Transaction";

export class TransactionRepository {
  async createTransaction(data: Transaction) {
    await TransactionModel.create(data);
  }
  async getTransactionOfUser(userId: any) {
    return await TransactionModel.find({ userId }).populate("userId");
  }
}
