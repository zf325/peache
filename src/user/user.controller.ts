import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import createUserDto from './dto/create-user.dto';
import IResData from './../common/interfaces/res-data.interface';
import { IReqParamCreateUser, UserNoPass } from './interfaces/user.interface';
import UserService from './user.service';
import { read } from 'fs';
@Controller('users')
export default class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async create(@Body() userData: IReqParamCreateUser): Promise<IResData> {
        const res: IResData = { errCode: -1 };
        try {
            const user: UserNoPass = await this.userService.create(userData as createUserDto);
            res.errCode = 0;
            res.result = user;
        } catch (err) {
            res.errInfo = err.message;
        }
        return res;
    }
    @Get(':userid')
    async findUserInfo(@Param('userid') userid: string): Promise<IResData> {
        const res: IResData = { errCode: -1 };
        try {
            res.result = await this.userService.findUserInfo(userid);
            res.errCode = 0;
        } catch (err) {
            res.errInfo = err.message;
        }
        return res;
    }
}
