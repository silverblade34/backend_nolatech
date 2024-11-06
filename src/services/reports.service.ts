import { AnswerDto, CreateReportDto } from '../dtos/create-report.dto';
import { ReportRepository } from '../repositories/report.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { IQuestion } from '../models/question.model';
import { EvaluationRepository } from '../repositories/evaluation.repository';
import { Report } from '../interfaces/report.interface';
import { EmployeeRepository } from '../repositories/employee.repository';

const reportRepository = new ReportRepository();
const evaluationRepository = new EvaluationRepository();
const questionRepository = new QuestionRepository();
const employeeRepository = new EmployeeRepository();

export const createReport = async (data: CreateReportDto) => {
    const findEvaluation = await evaluationRepository.findById(data.evaluationId.toString());
    if (!findEvaluation) {
        throw new Error("La evaluación no existe.");
    }
    const findReportExisting = await reportRepository.findReportsByEvaluationEmployeeAndEvaluator(findEvaluation._id.toString(), findEvaluation.employeeId.toString(), data.evaluatorId.toString());
    if (findReportExisting) {
        throw new Error("Ya se encuentra registrado un registro de esta evaluación para este empleado.");
    }
    const [findQuestions, findEmployee] = await Promise.all([
        questionRepository.findByEvaluationId(findEvaluation._id.toString()),
        employeeRepository.findOneById(findEvaluation.employeeId.toString()),
    ]);
    if (!findQuestions) {
        throw new Error("La evaluación no tiene preguntas asociadas.");
    }
    if (!findEmployee) {
        throw new Error("El empleado asociado a esta evaluación no se encuentra registrado");
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

    const report: Report = {
        evaluationId: data.evaluationId,
        evaluatorId: data.evaluatorId,
        departmentId: findEmployee?.departmentId,
        employeeId: findEvaluation.employeeId,
        score: parseFloat(score),
        answers
    };

    return await reportRepository.create(report);
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

export const getReportsByEmployee = async (employeeId: string) => {
    return await reportRepository.findReportsByEmployee(employeeId);
};

export const getReportsByDepartment = async (departmentId: string) => {
    return await reportRepository.findReportsByDepartment(departmentId);
};
