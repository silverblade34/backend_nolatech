import { CreateEvaluationDto } from "../dtos/create-evaluation.dto";
import { EvaluationRepository } from "../repositories/evaluation.repository";
import { QuestionRepository } from "../repositories/question.repository";

const evaluationRepository = new EvaluationRepository();
const questionRepository = new QuestionRepository();

export const insertEvaluation = async (createEvaluationDto: CreateEvaluationDto) => {
  return await evaluationRepository.create(createEvaluationDto);
};

export const getEvaluations = async () => {
  return await evaluationRepository.findAll();
};

export const getEvaluation = async (id: string) => {
  const findEvaluation = await evaluationRepository.findById(id);
  if (!findEvaluation) {
    throw new Error("La evaluación no se encuentra registrada.");
  }
  const findQuestions = await questionRepository.findByEvaluationId(findEvaluation._id.toString())
  const evaluation = findEvaluation.toObject()
  const evaluationQuestion = { ...evaluation, questions: findQuestions }
  return evaluationQuestion;
};

export const updateEvaluation = async (id: string, data: CreateEvaluationDto) => {
  return await evaluationRepository.update(id, data);
};