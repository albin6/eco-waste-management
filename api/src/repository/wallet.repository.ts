import { WalletModel } from "../models/wallet.model";

export class WalletRepository {
  async createWallet(userId: any) {
    await WalletModel.create({ userId });
  }

  async findWalletByUserId(userId: any) {
    return await WalletModel.findOne({ userId });
  }

  async findWalletByUserAndUpdateBalance(userId: any, balance: number) {
    await WalletModel.findOneAndUpdate(
      { userId },
      { $inc: { balance } },
      { new: true }
    );
  }
}
