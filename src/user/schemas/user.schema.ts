import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../interfaces/user.interface';

const userSchema = new mongoose.Schema({
    account: { type: String, unique: true, required: true },
    email: { type: String },
    cellPhone: { type: String },
    password: { type: String, required: true },
    nickname: { type: String },
    avatar: { type: String },
    role: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },

});

userSchema.pre('save', function(next) {
    // document.save() will excute this middleware
    // not use arrow function
    // need to cover this(type: document) into user document
    // we need to define an document contain all fields in schema
    const user: UserDocument = this as UserDocument;
    const now = new Date();
    user.createdAt = user.createdAt || now,
    user.updatedAt = now;
    if (!user.isModified('password')) {
        return next();
    } else {
        return bcrypt.hash(user.password, 12, (err, encodePass) => {
            if (err) {
                return next(err);
            } else {
                user.password = encodePass;
                return next();
            }
        });
    }
});

userSchema.index({ account: 1 });
userSchema.index({ email: 1 });
userSchema.index({ mobile: 1 });

export default userSchema;
