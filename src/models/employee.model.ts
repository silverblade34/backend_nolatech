import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  position: string;
  departmentId: mongoose.Schema.Types.ObjectId;
  email: string;
  phone: string;
  hireDate: Date;
  userId: mongoose.Schema.Types.ObjectId;
}

const EmployeeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "departments", required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    hireDate: { type: Date, default: Date.now },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const EmployeeModel = mongoose.model<IEmployee>("employees", EmployeeSchema);
export default EmployeeModel;
