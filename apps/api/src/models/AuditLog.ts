// Placeholder: AuditLog.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
class AuditLog extends Model {
  public id!: number;
  public userId!: number;
  public action!: string;
  public ip!: string;
  public timestamp!: Date;
}
AuditLog.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  action: { type: DataTypes.TEXT, allowNull: false },
  ip: { type: DataTypes.STRING(45), allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, tableName: 'audit_logs', underscored: true });
export default AuditLog;