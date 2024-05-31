import { Request, Response } from "express";
import { logger } from "../utils/pino";
import { IPermissionReqBody } from "../types/permission";
import Permission, { IPermissionAttributes } from "../models/permissionModel";
import db from "../models";
const getAllPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allPermissions: Permission[] = await db.Permission.findAll({
      attributes: ["name", "versionId", "description"],
    });

    res.json({ success: 1, result: allPermissions });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const createPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, versionId, description }: IPermissionReqBody = req.body;

    const newPermission: IPermissionAttributes = {
      name: name,
      versionId: versionId,
      description: description,
    };

    await db.Permission.create(newPermission);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, versionId, description }: IPermissionReqBody = req.body;

    const newPermission: IPermissionAttributes = {
      name: name,
      versionId: versionId,
      description: description,
    };

    await db.Permission.update(newPermission, {
      where: {
        id: id,
      },
    });

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
const deletePermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.body.id;

    await db.Permission.destroy({
      where: {
        id: id,
      },
    });

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
const getPermissionByIdConroller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const permission: Permission | null = await db.Permission.findOne({
      attributes: ["name", "versionId", "description"],
      where: {
        id: id,
      },
    });

    res.json({ success: 1, result: permission });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getPermissionsByVersion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const versionId: string = req.params.versionId;
    const permisions: Permission[] = await db.Permission.findAll({
      raw: true,
      attributes: [
        "name",
        "description",
        [db.sequelize.col("version.version"), "versionName"],
        [db.sequelize.col("version.description"), "versionDescription"],
      ],
      where: {
        versionId: versionId,
      },
      include: {
        model: db.Version,
        attributes: [],
      },
    });

    res.json({ success: 1, result: permisions });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  createPermissionController,
  getAllPermissionController,
  editPermissionController,
  deletePermissionController,
  getPermissionByIdConroller,
  getPermissionsByVersion,
};
