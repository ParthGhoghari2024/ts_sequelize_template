import db from "../models";
import Category, { ICategoryAttributes } from "../models/categoryModel";
import { ICategory } from "../types/categoryANDGenre";
import { logger } from "../utils/pino";

const insertCategory = async (
  newCategory: ICategoryAttributes
): Promise<Category | undefined> => {
  try {
    return await db.Category.create(newCategory);
  } catch (error) {
    logger.error(error);
  }
};

const getAllCategory = async (): Promise<Category[] | undefined> => {
  try {
    return await db.Category.findAll({
      attributes: ["category"],
    });
  } catch (error) {
    logger.error(error);
  }
};

const getCategoryById = async (id: number): Promise<Category | null> => {
  try {
    return await db.Category.findOne({
      attributes: ["category"],
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const updateCategory = async (
  category: string,
  id: number
): Promise<number[] | undefined> => {
  try {
    return await db.Category.update(
      {
        category: category,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    logger.error(error);
  }
};

const deleteCategory = async (id: number): Promise<number | null> => {
  try {
    return await db.Category.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export {
  insertCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};