import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from '../schema/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async login(email: string) {
    return this.userModel.findOne({ email });
  }

  async createUser(user: {
    email: string;
    roles: string[];
    passwordHash: string;
  }) {
    const newUser = new this.userModel({
      ...user,
      _id: new mongoose.Types.ObjectId(),
    });
    return newUser.save();
  }
}
