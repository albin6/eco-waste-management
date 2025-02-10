import { UserModel } from "../models/user.model";

export class UserRepository {
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    wallet: any;
  }) {
    return await UserModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      wallet: data.wallet,
    });
  }

  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async find(id: any) {
    return await UserModel.findById(id);
  }
}
