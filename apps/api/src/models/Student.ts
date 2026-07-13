import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface StudentAttributes {
  id: number;
  admissionNo: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: 'male' | 'female' | 'other';
  religion?: string;
  caste?: string;
  nationality?: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  classId: number;
  schoolId: number;
  status: 'active' | 'inactive' | 'graduated';
  createdAt?: Date;
  updatedAt?: Date;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public id!: number;
  public admissionNo!: string;
  public firstName!: string;
  public lastName!: string;
  public dob!: Date;
  public gender!: 'male' | 'female' | 'other';
  public religion?: string;
  public caste?: string;
  public nationality?: string;
  public address!: string;
  public guardianName!: string;
  public guardianPhone!: string;
  public guardianEmail?: string;
  public classId!: number;
  public schoolId!: number;
  public status!: 'active' | 'inactive' | 'graduated';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    admissionNo: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    firstName: { type: DataTypes.STRING(100), allowNull: false },
    lastName: { type: DataTypes.STRING(100), allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: false },
    religion: DataTypes.STRING(50),
    caste: DataTypes.STRING(50),
    nationality: DataTypes.STRING(50),
    address: { type: DataTypes.TEXT, allowNull: false },
    guardianName: { type: DataTypes.STRING(150), allowNull: false },
    guardianPhone: { type: DataTypes.STRING(20), allowNull: false },
    guardianEmail: DataTypes.STRING(100),
    classId: { type: DataTypes.INTEGER, allowNull: false },
    schoolId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'graduated'),
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    tableName: 'students',
    underscored: true,
    indexes: [{ fields: ['school_id'] }, { fields: ['class_id'] }],
  }
);

export default Student;
