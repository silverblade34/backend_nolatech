// src/models/employee.model.ts
import mongoose, { Schema } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: Date;
}

const EmployeeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    hireDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const EmployeeModel = mongoose.model<IEmployee>("employees", EmployeeSchema);
export default EmployeeModel;
