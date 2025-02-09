import { UserModel } from "../models/user.model";
import { User } from "../types/User";

export class UserRepository {
  async save(data: User) {
    return await UserModel.create(data);
  }

  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async find(id: any) {
    return await UserModel.findById(id);
  }
}
