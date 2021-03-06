import { Document } from 'mongoose';
export interface UserNoPass {
    readonly account: string;
    readonly email?: string;
    readonly cellPhone?: string;
    readonly nickname?: string;
    readonly avatar?: string;
    readonly role: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export interface UserDocument extends Document {
    readonly account: string;
    readonly email?: string;
    readonly cellPhone?: string;
    readonly nickname?: string;
    password?: string;
    readonly avatar?: string;
    readonly role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IReqParamCreateUser {
    readonly account: string;
    readonly password: string;
    readonly email?: string;
    readonly cellPhone?: string;
    readonly nickname?: string;
    readonly avatar?: string;
    readonly role: string;
}
