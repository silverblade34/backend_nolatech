import { CreateEvaluationDto } from "../dtos/create-evaluation.dto";
import EvaluationModel, { IEvaluation } from "../models/evaluation.model";

export class EvaluationRepository {
  async create(data: CreateEvaluationDto): Promise<IEvaluation> {
    const evaluation = new EvaluationModel(data);
    return await evaluation.save();
  }

  async findAll(): Promise<IEvaluation[]> {
    return EvaluationModel.find();
  }

  async findByEmployeeId(employeeId: string): Promise<IEvaluation[]> {
    return await EvaluationModel.find({
      evaluators: { $in: [employeeId] },
    });
  };

  async findByIdWithUser(id: string): Promise<IEvaluation | null> {
    const evaluation = EvaluationModel.findById(id)
      .populate("employeeId", "name role")
      .populate("evaluators", "name role")
      .exec();
    return evaluation;
  }

  async findById(id: string): Promise<IEvaluation | null> {
    const evaluation = EvaluationModel.findById(id).exec();
    return evaluation;
  }

  async update(id: string, data: CreateEvaluationDto): Promise<IEvaluation | null> {
    return EvaluationModel.findByIdAndUpdate(id, data, { new: true });
  }
}
