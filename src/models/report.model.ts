import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
    _id: Schema.Types.ObjectId;
    evaluationId: Schema.Types.ObjectId;
    evaluatorId: Schema.Types.ObjectId;
    employeeId: Schema.Types.ObjectId;
    answers: { questionId: Schema.Types.ObjectId; answer: string }[];
}

const ReportSchema: Schema = new Schema(
    {
        evaluationId: { type: Schema.Types.ObjectId, ref: 'evaluations', required: true },
        evaluatorId: { type: Schema.Types.ObjectId, ref: 'employees', required: true },
        employeeId: { type: Schema.Types.ObjectId, ref: 'employees', required: true },
        answers: [
            {
                questionId: { type: Schema.Types.ObjectId, ref: 'questions', required: true },
                answer: { type: String, required: true },
            }
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ReportModel = mongoose.model<IReport>('reports', ReportSchema);
export default ReportModel;
