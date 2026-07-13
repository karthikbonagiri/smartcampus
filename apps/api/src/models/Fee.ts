// Placeholder: Fee.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
class Fee extends Model {
  public id!: number;
  public studentId!: number;
  public feeType!: 'tuition' | 'transport' | 'hostel' | 'library' | 'exam' | 'other';
  public amount!: number;
  public dueDate!: Date;
  public paidDate?: Date;
  public status!: 'unpaid' | 'partial' | 'paid';
  public schoolId!: number;
}
Fee.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  feeType: { type: DataTypes.ENUM('tuition','transport','hostel','library','exam','other'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
  paidDate: DataTypes.DATEONLY,
  status: { type: DataTypes.ENUM('unpaid','partial','paid'), defaultValue: 'unpaid' },
  schoolId: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, tableName: 'fees', underscored: true });
export default Fee;