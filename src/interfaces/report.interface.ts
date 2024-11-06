import mongoose from "mongoose";

export interface Report {
    evaluationId: mongoose.Schema.Types.ObjectId;
    evaluatorId: mongoose.Schema.Types.ObjectId;
    employeeId: mongoose.Schema.Types.ObjectId;
    score: number;
    answers: Answer[];
}

export interface Answer {
    answer: string;
}