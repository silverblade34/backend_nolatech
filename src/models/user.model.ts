import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  password: string;
  role: "admin" | "manager" | "employee";
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager", "employee"], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model<IUser>("users", UserSchema);
export default UserModel;
