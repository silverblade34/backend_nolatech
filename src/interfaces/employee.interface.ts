import mongoose from "mongoose";

export interface Employee {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    hireDate: Date;
    userId: mongoose.Schema.Types.ObjectId;
}