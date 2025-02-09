import { TransactionRepository } from "../repository/transaction.repository";
import { Transaction } from "../types/Transaction";

export class TransactionServices {
  private transactionRepostory: TransactionRepository;
  constructor() {
    this.transactionRepostory = new TransactionRepository();
  }
  async createTransaction(data: Transaction): Promise<void> {
    await this.transactionRepostory.createTransaction(data);
  }

  async getTransactions(userId: any) {
    return await this.transactionRepostory.getTransactionOfUser(userId);
  }
}
