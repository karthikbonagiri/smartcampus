import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: 'super_admin' | 'school_admin' | 'principal' | 'teacher' | 'parent' | 'student' | 'accountant' | 'librarian' | 'transport' | 'hostel' | 'hr';
  schoolId?: number;
  isActive: boolean;
  lastLogin?: Date;
  twoFactorSecret?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isActive' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: UserAttributes['role'];
  public schoolId?: number;
  public isActive!: boolean;
  public lastLogin?: Date;
  public twoFactorSecret?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: {
      type: DataTypes.ENUM(
        'super_admin',
        'school_admin',
        'principal',
        'teacher',
        'parent',
        'student',
        'accountant',
        'librarian',
        'transport',
        'hostel',
        'hr'
      ),
      allowNull: false,
    },
    schoolId: DataTypes.INTEGER,
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    lastLogin: DataTypes.DATE,
    twoFactorSecret: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'users',
    underscored: true,
  }
);

export default User;
