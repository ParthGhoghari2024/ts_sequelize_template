import { Request, Response } from "express";
// import { userModel, UserAttributes } from "../models/userModel";

import db from "../models";
import { logger } from "../utils/pino";
import { IUser } from "../types/user";
import { IUserAttributes } from "../models/userModel";
interface IError extends Error {
  parent: {
    sqlMessage: string;
  };
}

const getAllUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: IUserAttributes[] = await db.UserModel.findAll({
      attributes: ["id", "name2", "email", "createdAt", "updatedAt"],
      raw: true,
    });

    res.json({ success: 1, result: users });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const IErrorInstance = error as IError;
      if (error.name === "SequelizeDatabaseError") {
        console.log(IErrorInstance.parent.sqlMessage);
      }
    }
  }
};

const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roleId: number = 1; //TODO:
    const newUser: IUser = {
      name: req.body.name,
      email: req.body.email,
      roleId: roleId,
    };

    await db.UserModel.create(newUser);

    res.json({ success: 1 });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: number = req.body.userId;
    await db.UserModel.destroy({
      where: {
        id: userId,
      },
    });

    // console.log(deleteUserResult);

    res.json({ success: 1 });
  } catch (error) {
    console.log(error);
  }
};
export { getAllUserController, createUserController, deleteUserController };
