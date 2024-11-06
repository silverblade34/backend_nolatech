import mongoose, { Document, Schema } from 'mongoose';

export interface IEvaluation extends Document {
    _id: Schema.Types.ObjectId;
    period: string;
    status: 'draft' | 'completed';
    type: string;
    questions: mongoose.Types.Array<string>;
}

const EvaluationSchema: Schema = new Schema(
    {
        period: { type: String, required: true },
        status: { type: String, required: true, enum: ['draft', 'completed'], default: 'draft' },
        type: { type: String, required: true },
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const EvaluationModel = mongoose.model<IEvaluation>('evaluations', EvaluationSchema);
export default EvaluationModel;
