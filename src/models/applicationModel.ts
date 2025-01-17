import { Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import User from "./userModel";
import Category from "./categoryModel";
import Genre from "./genreModel";
import Version from "./versionModel";
import InstalledApp from "./installedAppModel";
import AppImages from "./appImageModel";
import Rating from "./ratingModel";
import ApkFile from "./apkFileModel";
export interface IApplicationAttributes {
  id?: number;
  name?: string;
  developerId?: number;
  description?: string;
  categoryId?: number;
  genreId?: number;
  downloads?: number;
}

export interface IApplicationCreationAttributes
  extends Optional<IApplicationAttributes, "id"> {}
@Table({ tableName: "applications" })
class Application extends Model<
  IApplicationAttributes,
  IApplicationCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  name!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  developerId!: number;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  description!: string;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId!: number;

  @AllowNull(false)
  @ForeignKey(() => Genre)
  @Column({ type: DataType.INTEGER })
  genreId!: number;

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.INTEGER })
  downloads!: number;

  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => User, "developerId")
  developer!: User;

  @BelongsTo(() => Genre, "genreId")
  genre!: Genre;

  @BelongsTo(() => Category, "categoryId")
  category!: Category;

  @HasMany(() => Version, "applicationId")
  versions!: Version[];

  @BelongsToMany(() => User, () => InstalledApp)
  users!: User[];

  @HasMany(() => AppImages, "appId")
  appImages!: AppImages[];

  @HasMany(() => Rating, "appId")
  ratings!: Rating[];

  @HasMany(() => ApkFile, "appId")
  apkFiles!: ApkFile[];
}

export default Application;
