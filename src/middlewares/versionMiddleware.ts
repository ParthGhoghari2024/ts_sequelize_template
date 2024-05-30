import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { logger } from "../utils/pino";

const createVersionSchema: Joi.ObjectSchema = Joi.object({
  applicationId: Joi.number().required(),
  version: Joi.string().required().max(255),
  description: Joi.string().required(),
});

const createVersionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = createVersionSchema.validate(
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

const editVersionSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
  applicationId: Joi.number().optional(),
  version: Joi.string().optional().max(255),
  description: Joi.string().optional(),
});

const editVersionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = editVersionSchema.validate(
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

const deleteVersionSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
});

const deleteVersionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = deleteVersionSchema.validate(
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
export {
  createVersionMiddleware,
  editVersionMiddleware,
  deleteVersionMiddleware,
};