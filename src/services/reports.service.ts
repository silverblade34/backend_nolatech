import { AnswerDto, CreateReportDto } from '../dtos/create-report.dto';
import EvaluationModel from '../models/evaluation.model';
import { IQuestion } from '../models/question.model';
import ReportModel, { IReport } from '../models/report.model';
import { QuestionRepository } from '../repositories/question.repository';

const questionRepository = new QuestionRepository();

export const createReport = async (data: CreateReportDto) => {
    const findEvaluation = await EvaluationModel.findById(data.evaluationId);
    if (!findEvaluation) {
        throw new Error("La evaluación no existe.");
    }
    const findQuestions = await questionRepository.findByEvaluationId(findEvaluation._id.toString())

    if (!findQuestions) {
        throw new Error("La evaluación no tiene preguntas asociadas");
    }
    const isEvaluatorAuthorized = findEvaluation.evaluators.some(
        (evaluator: any) => evaluator._id.toString() === data.evaluatorId.toString()
    );
    if (!isEvaluatorAuthorized) {
        throw new Error("El evaluador no está autorizado para esta evaluación.");
    }

    const answers = data.answers.map(answer => {
        const questionExists = findQuestions.some(
            (question: any) => question._id.toString() === answer.questionId.toString()
        );
        if (!questionExists) {
            throw new Error(`La pregunta con ID ${answer.questionId} no pertenece a esta evaluación.`);
        }
        return answer;
    });

    const score = calculateScore(answers, findQuestions).toFixed(2);

    const report: IReport = new ReportModel({
        evaluationId: data.evaluationId,
        evaluatorId: data.evaluatorId,
        employeeId: data.employeeId,
        score,
        answers
    });

    return await report.save();
};

const calculateScore = (answers: AnswerDto[], findQuestions: IQuestion[]): number => {
    let score = 0;
    answers.forEach(answer => {
        const question = findQuestions.find(q => q._id.toString() === answer.questionId.toString());
        if (question) {
            const optionIndex = question.options.indexOf(answer.answer);
            if (optionIndex === -1) {
                throw new Error(`Respuesta inválida para la pregunta ${question.text}`);
            }
            let questionScore = 0;

            switch (question.scaleType) {
                case 'Likert':
                    questionScore = optionIndex;
                    break;
                case 'Frecuencia':
                    questionScore = optionIndex;
                    break;
                case 'Desempeño':
                    questionScore = optionIndex;
                    break;
                default:
                    throw new Error(`Escala desconocida para la pregunta ${question.text}`);
            }

            score += questionScore;
        }
    });

    return score / answers.length;
};
