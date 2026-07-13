import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ExamAttributes {
  id: number;
  name: string;               // e.g., "Mid-Term"
  classId: number;
  subjectId: number;
  examDate: Date;
  maxMarks: number;
  passingMarks: number;
  description?: string;
  schoolId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ExamCreationAttributes extends Optional<ExamAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Exam extends Model<ExamAttributes, ExamCreationAttributes> implements ExamAttributes {
  public id!: number;
  public name!: string;
  public classId!: number;
  public subjectId!: number;
  public examDate!: Date;
  public maxMarks!: number;
  public passingMarks!: number;
  public description?: string;
  public schoolId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Exam.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  classId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  examDate: { type: DataTypes.DATEONLY, allowNull: false },
  maxMarks: { type: DataTypes.INTEGER, allowNull: false },
  passingMarks: { type: DataTypes.INTEGER, allowNull: false },
  description: DataTypes.TEXT,
  schoolId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  tableName: 'exams',
  underscored: true,
  indexes: [{ fields: ['school_id'] }, { fields: ['class_id'] }]
});

export default Exam;