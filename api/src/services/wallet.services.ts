import { WalletRepository } from "../repository/wallet.repository";

export class WalletService {
  private walletRepository: WalletRepository;
  constructor() {
    this.walletRepository = new WalletRepository();
  }

  async getWalletBalance(userId: any) {
    return await this.walletRepository.findWalletByUserId(userId);
  }

  async updateWalletBalance(userId: any, balance: number) {
    await this.walletRepository.findWalletByUserAndUpdateBalance(
      userId,
      balance
    );
  }
}
