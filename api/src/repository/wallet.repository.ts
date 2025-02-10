import { WalletModel } from "../models/wallet.model";

export class WalletRepository {
  async createWallet() {
    return await WalletModel.create({ balance: 0 });
  }

  async findWalletById(id: any) {
    return await WalletModel.findById(id);
  }

  async findWalletByIdAndUpdateBalance(id: any, balance: number) {
    await WalletModel.findByIdAndUpdate(
      id,
      { $inc: { balance } },
      { new: true }
    );
  }
}
