import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!:
    | 'super_admin'
    | 'school_admin'
    | 'principal'
    | 'teacher'
    | 'parent'
    | 'student'
    | 'accountant'
    | 'librarian'
    | 'transport'
    | 'hostel'
    | 'hr';
  public schoolId?: number;
  public isActive!: boolean;
  public lastLogin?: Date;
  public twoFactorSecret?: string;
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
