import { UserRepository } from "../repository/user.repository";
import { WalletRepository } from "../repository/wallet.repository";
import { User } from "../types/User";
import { AppError } from "../utils/AppError";

export class UserServices {
  private userRepository: UserRepository;
  private walletRepostory: WalletRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.walletRepostory = new WalletRepository();
  }

  async createNewUser(data: User) {
    const isUserWithEmailExists = await this.userRepository.findByEmail(
      data.email
    );

    if (isUserWithEmailExists) {
      throw new AppError("Email Already Exists", 409);
    }

    const user = await this.userRepository.save(data);
    await this.walletRepostory.createWallet(user._id);
  }

  async loginUser(data: { email: string; password: string }) {
    const isEmailExists = await this.userRepository.findByEmail(data.email);

    if (!isEmailExists) {
      throw new AppError("Email Not Found", 404);
    }

    const isPasswordCorrect = isEmailExists.password == data.password;

    if (!isPasswordCorrect) {
      throw new AppError("Invalid email or password", 400);
    }

    return isEmailExists;
  }

  async getUserDetails(id: any) {
    const user = await this.userRepository.find(id);

    if (!user) {
      throw new AppError("Invalid UserID", 400);
    }

    return user;
  }
}
