import { User } from "../interfaces/user.interface";
import UserModel, { IUser } from "../models/user.model";

export class UserRepository {
  async create(userData: User): Promise<IUser | null> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findOneById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async findOneByUsername(username: string) {
    return await UserModel.findOne({ username });
  }

  async update(id: string, data: User): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }
}
