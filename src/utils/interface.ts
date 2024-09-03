import { Request } from "express";
import { UserModel } from "../models/user";

export interface LoggedInUser extends Request {
    user?: UserModel;
    userId?: number| unknown;
}

export interface JwtValue {
    userId?: number | unknown;
    jwtSequence?: number;
}