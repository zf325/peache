import { Controller, Post, Body } from '@nestjs/common';
import createUserDto from './dto/create-user.dto';
import IResData from './../common/interfaces/res-data.interface';
import { IReqParamCreateUser, UserModel } from './interfaces/user.interface';
import UserService from './user.service';
@Controller('users')
export default class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async create(@Body() userData: IReqParamCreateUser): Promise<IResData> {
        const res: IResData = { errCode: -1, result: [] };
        try {
            const user: UserModel = await this.userService.create(userData as createUserDto);
            res.errCode = 0;
            res.result = user;
        } catch (err) {
            res.errInfo = err.message;
        }
        return res;
    }
}
