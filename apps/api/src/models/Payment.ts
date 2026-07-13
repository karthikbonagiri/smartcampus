// Placeholder: Payment.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
class Payment extends Model {
  public id!: number;
  public studentId!: number;
  public amount!: number;
  public mode!: 'upi' | 'card' | 'netbanking' | 'wallet';
  public transactionId!: string;
  public paymentDate!: Date;
  public receiptUrl?: string;
  public schoolId!: number;
}
Payment.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  mode: { type: DataTypes.ENUM('upi','card','netbanking','wallet'), allowNull: false },
  transactionId: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  paymentDate: { type: DataTypes.DATE, allowNull: false },
  receiptUrl: DataTypes.STRING(255),
  schoolId: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, tableName: 'payments', underscored: true });
export default Payment;