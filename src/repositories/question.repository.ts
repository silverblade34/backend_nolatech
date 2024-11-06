import { Question } from "../interfaces/question.interface";
import QuestionModel from "../models/question.model";
import { IQuestion } from "../models/question.model";

export class QuestionRepository {
  async create(data: Question): Promise<IQuestion> {
    const question = new QuestionModel(data);
    return await question.save();
  }

  async findAll(): Promise<IQuestion[]> {
    return QuestionModel.find();
  }

  async findById(id: string): Promise<IQuestion | null> {
    return QuestionModel.findById(id);
  }

  async findByEvaluationId(evaluationId: string): Promise<IQuestion[] | null> {
    return QuestionModel.find({ evaluationId });
  }

  async update(id: string, data: Question): Promise<IQuestion | null> {
    return QuestionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findByText(text: string): Promise<IQuestion | null> {
    return QuestionModel.findOne({ text });
  }
}
