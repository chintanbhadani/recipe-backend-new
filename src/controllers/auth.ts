import { Request, Response } from 'express';
import {
  DEFAULT_MESSAGE,
  DEFAULT_MESSAGE_TYPE,
  RESPONSE_MESSAGE,
  STATUS_CODE,
} from '../utils/respose';
import { createJwt } from '../utils/helper';
import bcrypt from 'bcrypt';
import User from '../models/user';

export const signUp = async (req: Request, res: Response) => {
  try {
    const email = req.body.email,
      name = req.body.name,
      password = req.body.password;

    const already = await User.findOne({ email });

    if (already) throw RESPONSE_MESSAGE.EMAIL_ALREADY;

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = createJwt({ userId: user._id });

    return res.status(STATUS_CODE.OK).json({
      message: DEFAULT_MESSAGE('Your account has been', DEFAULT_MESSAGE_TYPE.CREATED),
      data: { user, token },
    });
  } catch (error) {
    return res.sendError(error, 'signUp');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email,
      password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) throw DEFAULT_MESSAGE('User', DEFAULT_MESSAGE_TYPE.NOT_FOUND);

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) throw 'Invalid password';

    const token = createJwt({ userId: user._id });

    return res.status(STATUS_CODE.OK).json({
      message: 'Login success',
      data: { user, token },
    });
  } catch (error) {
    return res.sendError(error, 'login');
  }
};
