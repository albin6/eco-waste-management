import { TransactionModel } from "../models/transaction.model";

export class TransactionRepository {
  async createTransaction(data: any) {
    await TransactionModel.create(data);
  }
  async getTransactionOfUser(wallet: any) {
    return await TransactionModel.find({ wallet }).populate("userId");
  }
}
