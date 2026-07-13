// Placeholder: School.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
class School extends Model {
  public id!: number;
  public name!: string;
  public subdomain!: string;
  public subscriptionPlan!: 'trial' | 'basic' | 'premium' | 'enterprise';
  public status!: 'pending' | 'verified' | 'active' | 'suspended' | 'expired';
  public address?: string;
  public phone?: string;
  public email?: string;
}
School.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  subdomain: { type: DataTypes.STRING, allowNull: false, unique: true },
  subscriptionPlan: { type: DataTypes.ENUM('trial','basic','premium','enterprise'), defaultValue: 'trial' },
  status: { type: DataTypes.ENUM('pending','verified','active','suspended','expired'), defaultValue: 'pending' },
  address: DataTypes.TEXT,
  phone: DataTypes.STRING(20),
  email: DataTypes.STRING(100)
}, { sequelize, tableName: 'schools', underscored: true });
export default School;