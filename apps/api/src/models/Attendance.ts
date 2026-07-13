// Placeholder: Attendance.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
class Attendance extends Model {
  public id!: number;
  public studentId!: number;
  public date!: Date;
  public status!: 'present' | 'absent' | 'holiday' | 'late';
  public classId!: number;
  public teacherId!: number;
  public remarks?: string;
  public schoolId!: number;
}
Attendance.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('present','absent','holiday','late'), allowNull: false },
  classId: { type: DataTypes.INTEGER, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  remarks: DataTypes.TEXT,
  schoolId: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, tableName: 'attendances', underscored: true, indexes: [{ fields: ['student_id','date'] }] });
export default Attendance;