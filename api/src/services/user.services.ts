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
    console.log("create new user=>", data);
    const wallet = await this.walletRepostory.createWallet();
    const user = await this.userRepository.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role!,
      wallet: wallet._id,
    });

    await user.save();
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

  async addNewUserUnderAUser(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    userId: any;
  }) {
    const isUserWithEmailExists = await this.userRepository.findByEmail(
      data.email
    );

    if (isUserWithEmailExists) {
      throw new AppError("Email Already Exists", 409);
    }

    const existingUser = await this.userRepository.find(data.userId);

    const user = await this.userRepository.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      wallet: existingUser?.wallet!,
    });

    user.wallet = existingUser?.wallet!;

    await user.save();
  }
}
