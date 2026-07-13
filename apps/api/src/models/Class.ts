// Placeholder: Class.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
class Class extends Model {
  public id!: number;
  public name!: string;  // e.g., "10"
  public section!: string; // "A"
  public academicYear!: string;
  public classTeacherId?: number;
  public schoolId!: number;
}
Class.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(50), allowNull: false },
  section: { type: DataTypes.STRING(10), allowNull: false },
  academicYear: { type: DataTypes.STRING(9), allowNull: false },
  classTeacherId: DataTypes.INTEGER,
  schoolId: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, tableName: 'classes', underscored: true });
export default Class;