import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TimetableAttributes {
  id: number;
  classId: number;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  period: number;               // 1,2,3...
  subjectId: number;
  teacherId: number;
  roomNo?: string;
  schoolId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TimetableCreationAttributes extends Optional<TimetableAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Timetable extends Model<TimetableAttributes, TimetableCreationAttributes> implements TimetableAttributes {
  public id!: number;
  public classId!: number;
  public dayOfWeek!: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  public period!: number;
  public subjectId!: number;
  public teacherId!: number;
  public roomNo?: string;
  public schoolId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Timetable.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  classId: { type: DataTypes.INTEGER, allowNull: false },
  dayOfWeek: { type: DataTypes.ENUM('monday','tuesday','wednesday','thursday','friday','saturday','sunday'), allowNull: false },
  period: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  roomNo: DataTypes.STRING(20),
  schoolId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  tableName: 'timetables',
  underscored: true,
  indexes: [
    { fields: ['class_id', 'day_of_week', 'period'], unique: true }, // No duplicate slots
    { fields: ['school_id'] }
  ]
});

export default Timetable;