import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { logger } from "../utils/pino";

const createGenreSchema: Joi.ObjectSchema = Joi.object({
  genre: Joi.string().required().max(255),
});

const createGenreMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = createGenreSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );
    if (error) {
      res.json({ success: 0, error });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const editGenreSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
  genre: Joi.string().optional().max(255),
});

const editGenreMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = editGenreSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );
    if (error) {
      res.json({ success: 0, error });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const deleteGenreSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
});

const deleteGenreMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = deleteGenreSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );
    if (error) {
      res.json({ success: 0, error });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};
export { createGenreMiddleware, editGenreMiddleware, deleteGenreMiddleware };