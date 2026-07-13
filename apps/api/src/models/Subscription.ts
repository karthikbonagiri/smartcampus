// Placeholder: Subscription.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
class Subscription extends Model {
  public id!: number;
  public schoolId!: number;
  public plan!: 'trial' | 'basic' | 'premium' | 'enterprise';
  public startDate!: Date;
  public endDate!: Date;
  public status!: 'active' | 'expired' | 'cancelled' | 'grace';
  public paymentGateway!: 'razorpay' | 'phonepe';
  public gatewayTransactionId?: string;
}
Subscription.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  schoolId: { type: DataTypes.INTEGER, allowNull: false },
  plan: { type: DataTypes.ENUM('trial','basic','premium','enterprise'), allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('active','expired','cancelled','grace'), defaultValue: 'active' },
  paymentGateway: { type: DataTypes.ENUM('razorpay','phonepe'), allowNull: false },
  gatewayTransactionId: DataTypes.STRING(100)
}, { sequelize, tableName: 'subscriptions', underscored: true });
export default Subscription;