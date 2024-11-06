import mongoose from "mongoose";

export interface Employee {
    name: string;
    position: string;
    departmentId: mongoose.Schema.Types.ObjectId;
    email: string;
    phone: string;
    hireDate: Date;
    userId: mongoose.Schema.Types.ObjectId;
}