import { Injectable } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { UserDocument, UserNoPass } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export default class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}
    isObjectId(id: string): boolean {
        return Types.ObjectId.isValid(id);
    }
    async create(createUserDto: CreateUserDto): Promise<UserNoPass> {
        const user: UserDocument = await (new this.userModel(createUserDto)).save();
        return user as UserNoPass;
    }
    async findUserInfo(userid: string): Promise<UserNoPass> {
        const $or: object[] = [];
        if (this.isObjectId(userid)) {
            $or.push({ _id: userid });
        } else {
            $or.push({ account: userid });
            $or.push({ mobile: userid });
            $or.push({ email: userid });
        }
        const user: UserDocument = await this.userModel.findOne({ $or }).select({ password: 0, __v: 0 });
        return user as UserNoPass;
    }
}
