import { DataTypes, Model, Sequelize } from "sequelize";

interface CategoryAttributes {
  id?: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
module.exports = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  class CategoryModel
    extends Model<CategoryAttributes>
    implements CategoryAttributes
  {
    public id!: number;
    public category!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }

  CategoryModel.init(
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: DataType.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: "categories",
      sequelize,
    }
  );

  return CategoryModel;
};