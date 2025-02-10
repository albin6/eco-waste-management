import { TransactionRepository } from "../repository/transaction.repository";
import { UserRepository } from "../repository/user.repository";
import { WalletRepository } from "../repository/wallet.repository";
import { Transaction } from "../types/Transaction";

export class TransactionServices {
  private transactionRepostory: TransactionRepository;
  private walletRepository: WalletRepository;
  private userRepository: UserRepository;
  constructor() {
    this.transactionRepostory = new TransactionRepository();
    this.walletRepository = new WalletRepository();
    this.userRepository = new UserRepository();
  }
  async createTransaction(data: Transaction): Promise<void> {
    const user = await this.userRepository.find(data.userId);
    await this.transactionRepostory.createTransaction({
      amount: data.amount,
      date: data.date,
      to: data.to,
      transactionId: data.transactionId,
      transactionType: data.transactionType,
      userId: user?._id as any,
      wallet: user?.wallet,
    });
    await this.walletRepository.findWalletByIdAndUpdateBalance(
      user?.wallet!,
      data.amount
    );
  }

  async getTransactions(userId: any) {
    const user = await this.userRepository.find(userId);
    return await this.transactionRepostory.getTransactionOfUser(user?.wallet);
  }
}
