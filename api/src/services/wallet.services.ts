import { UserRepository } from "../repository/user.repository";
import { WalletRepository } from "../repository/wallet.repository";

export class WalletService {
  private walletRepository: WalletRepository;
  private userRepository: UserRepository;
  constructor() {
    this.walletRepository = new WalletRepository();
    this.userRepository = new UserRepository();
  }

  async getWalletBalance(userId: any) {
    const user = await this.userRepository.find(userId);
    return await this.walletRepository.findWalletById(user?.wallet!);
  }

  async updateWalletBalance(userId: any, balance: number) {
    const user = await this.userRepository.find(userId);
    await this.walletRepository.findWalletByIdAndUpdateBalance(
      user?.wallet,
      balance
    );
  }
}
