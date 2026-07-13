import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
class Teacher extends Model {
  public id!: number;
  public employeeId!: string;
  public firstName!: string;
  public lastName!: string;
  public qualification?: string;
  public joiningDate!: Date;
  public schoolId!: number;
}
Teacher.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employeeId: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  firstName: { type: DataTypes.STRING(100), allowNull: false },
  lastName: { type: DataTypes.STRING(100), allowNull: false },
  qualification: DataTypes.STRING(200),
  joiningDate: { type: DataTypes.DATEONLY, allowNull: false },
  schoolId: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, tableName: 'teachers', underscored: true });
export default Teacher;// Placeholder: Teacher.ts
