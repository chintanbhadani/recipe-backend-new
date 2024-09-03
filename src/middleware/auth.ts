import { NextFunction, Response } from "express";
import { JwtValue, LoggedInUser } from "../utils/interface";
import { RESPONSE_MESSAGE, STATUS_CODE } from "../utils/respose";
import Jwt from 'jsonwebtoken';
import User from "../models/user";

export const verifyUserLogin = async (req: LoggedInUser, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;

        if (!token) throw RESPONSE_MESSAGE.UNAUTHORIZE;

        token = token.replace('Bearer ', '');

        if (!token) throw RESPONSE_MESSAGE.UNAUTHORIZE;

        let tokenValue: JwtValue;

        try {
            tokenValue = Jwt.verify(token, process.env.JWT_SECRET ?? 'MY_WEB_APK') as JwtValue;
        } catch (error) {
            throw RESPONSE_MESSAGE.UNAUTHORIZE;
        }

        if (!tokenValue.userId) throw RESPONSE_MESSAGE.UNAUTHORIZE;

        const user = await User.findOne({ _id: tokenValue.userId });

        if (!user) throw RESPONSE_MESSAGE.UNAUTHORIZE;

        req.user = user;
        req.userId = user._id;

        next();
    } catch (error) {

        return res.status(STATUS_CODE.UNAUTHORIZE).json({
            message: RESPONSE_MESSAGE.UNAUTHORIZE,
            success: false,
        });
    }
};