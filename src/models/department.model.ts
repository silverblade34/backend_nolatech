import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
}

const DepartmentSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const DepartmentModel = mongoose.model<IDepartment>("departments", DepartmentSchema);
export default DepartmentModel;
