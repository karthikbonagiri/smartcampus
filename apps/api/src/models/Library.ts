import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface LibraryAttributes {
  id: number;
  bookTitle: string;
  author: string;
  isbn: string;
  publisher?: string;
  publicationYear?: number;
  quantity: number;
  availableQuantity: number;
  location?: string;        // shelf/rack
  schoolId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LibraryCreationAttributes extends Optional<LibraryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Library extends Model<LibraryAttributes, LibraryCreationAttributes> implements LibraryAttributes {
  public id!: number;
  public bookTitle!: string;
  public author!: string;
  public isbn!: string;
  public publisher?: string;
  public publicationYear?: number;
  public quantity!: number;
  public availableQuantity!: number;
  public location?: string;
  public schoolId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Library.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookTitle: { type: DataTypes.STRING(255), allowNull: false },
  author: { type: DataTypes.STRING(255), allowNull: false },
  isbn: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  publisher: DataTypes.STRING(255),
  publicationYear: DataTypes.INTEGER,
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  availableQuantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  location: DataTypes.STRING(100),
  schoolId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  tableName: 'library_books',
  underscored: true,
  indexes: [{ fields: ['school_id'] }, { fields: ['isbn'] }]
});

export default Library;