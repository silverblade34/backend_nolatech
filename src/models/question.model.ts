import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
    _id: Schema.Types.ObjectId;
    text: string;
    evaluationId: Schema.Types.ObjectId;
    scaleType: 'Likert' | 'Frecuencia' | 'Desempeño';
    options: string[];
}

const QuestionSchema: Schema = new Schema(
    {
        text: { type: String, required: true },
        evaluationId: { type: Schema.Types.ObjectId, ref: 'evaluations', required: true },
        scaleType: {
            type: String,
            enum: ['Likert', 'Frecuencia', 'Desempeño'],
            required: true
        },
        options: {
            type: [String],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const QuestionModel = mongoose.model<IQuestion>('questions', QuestionSchema);
export default QuestionModel;
