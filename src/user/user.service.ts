import { Injectable } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { UserDocument, UserModel } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export default class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {};
    async create(createUserDto: CreateUserDto): Promise<UserModel> {
        const user: UserDocument = await (new this.userModel(createUserDto)).save();
        const { password, ...account } = user.toJSON();
        return <UserModel>account;

    }
}