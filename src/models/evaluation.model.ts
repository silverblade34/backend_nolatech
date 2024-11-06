import mongoose, { Document, Schema } from 'mongoose';

export interface IEvaluation extends Document {
    _id: Schema.Types.ObjectId;
    period: string;
    status: 'draft' | 'submitted' | 'completed';
    type: 'self-assessment' | 'peer-assessment' | 'manager-assessment';
    questions: mongoose.Types.Array<string>;
}

const EvaluationSchema: Schema = new Schema(
    {
        period: { type: String, required: true },
        status: { type: String, enum: ['draft', 'submitted', 'completed'], default: 'draft' },
        type: {
            type: String,
            enum: ['self-assessment', 'peer-assessment', 'manager-assessment'],
            required: true
        },
        employeeId: { type: Schema.Types.ObjectId, ref: 'employees', required: true },
        evaluators: [{ type: Schema.Types.ObjectId, ref: 'employees' }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const EvaluationModel = mongoose.model<IEvaluation>('evaluations', EvaluationSchema);
export default EvaluationModel;
