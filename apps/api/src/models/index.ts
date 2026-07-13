// ============= IMPORTS =============
import User from './User';
import School from './School';
import Student from './Student';
import Teacher from './Teacher';
import Class from './Class';
import Attendance from './Attendance';
import Fee from './Fee';
import Payment from './Payment';
import Subscription from './Subscription';
import AuditLog from './AuditLog';
import Library from './Library';
import Exam from './Exam';
import Timetable from './Timetable';

// ============= ASSOCIATIONS =============

// School <-> Users
School.hasMany(User, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
User.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Students
School.hasMany(Student, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Student.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Teachers
School.hasMany(Teacher, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Teacher.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Classes
School.hasMany(Class, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Class.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Attendance
School.hasMany(Attendance, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Attendance.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Fees
School.hasMany(Fee, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Fee.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Payments
School.hasMany(Payment, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Payment.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Subscriptions
School.hasMany(Subscription, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Subscription.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> AuditLogs
School.hasMany(AuditLog, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
AuditLog.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Library
School.hasMany(Library, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Library.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Exams
School.hasMany(Exam, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Exam.belongsTo(School, { foreignKey: 'schoolId' });

// School <-> Timetable
School.hasMany(Timetable, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Timetable.belongsTo(School, { foreignKey: 'schoolId' });

// Class <-> Students
Class.hasMany(Student, { foreignKey: 'classId', onDelete: 'SET NULL' });
Student.belongsTo(Class, { foreignKey: 'classId' });

// Class <-> Timetable
Class.hasMany(Timetable, { foreignKey: 'classId', onDelete: 'CASCADE' });
Timetable.belongsTo(Class, { foreignKey: 'classId' });

// Class <-> Exams
Class.hasMany(Exam, { foreignKey: 'classId', onDelete: 'CASCADE' });
Exam.belongsTo(Class, { foreignKey: 'classId' });

// Teacher <-> Class (as class teacher)
Class.belongsTo(Teacher, { foreignKey: 'classTeacherId', as: 'classTeacher' });
Teacher.hasMany(Class, { foreignKey: 'classTeacherId', as: 'classesTaught' });

// Teacher <-> Timetable
Teacher.hasMany(Timetable, { foreignKey: 'teacherId', onDelete: 'CASCADE' });
Timetable.belongsTo(Teacher, { foreignKey: 'teacherId' });

// Teacher <-> Attendance
Teacher.hasMany(Attendance, { foreignKey: 'teacherId', onDelete: 'SET NULL' });
Attendance.belongsTo(Teacher, { foreignKey: 'teacherId' });

// Student <-> Attendance
Student.hasMany(Attendance, { foreignKey: 'studentId', onDelete: 'CASCADE' });
Attendance.belongsTo(Student, { foreignKey: 'studentId' });

// Student <-> Fees
Student.hasMany(Fee, { foreignKey: 'studentId', onDelete: 'CASCADE' });
Fee.belongsTo(Student, { foreignKey: 'studentId' });

// Student <-> Payments
Student.hasMany(Payment, { foreignKey: 'studentId', onDelete: 'CASCADE' });
Payment.belongsTo(Student, { foreignKey: 'studentId' });

// User <-> AuditLogs (who performed the action)
User.hasMany(AuditLog, { foreignKey: 'userId', onDelete: 'SET NULL' });
AuditLog.belongsTo(User, { foreignKey: 'userId' });

// ============= EXPORTS =============
export {
  User,
  School,
  Student,
  Teacher,
  Class,
  Attendance,
  Fee,
  Payment,
  Subscription,
  AuditLog,
  Library,
  Exam,
  Timetable
};