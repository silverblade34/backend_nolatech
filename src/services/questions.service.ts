import { QuestionRepository } from "../repositories/question.repository";
import { CreateQuestionDto } from "../dtos/create-question.dto";
import { Question } from "../interfaces/question.interface";

const questionRepository = new QuestionRepository();

export const insertQuestion = async (data: CreateQuestionDto) => {
  const existingQuestion = await questionRepository.findByText(data.text);
  if (existingQuestion) {
    throw new Error("La pregunta ya existe.");
  }

  let options: string[];

  switch (data.scaleType) {
    case 'Likert':
      options = ["Muy Malo", "Malo", "Neutral", "Bueno", "Excelente"];
      break;
    case 'Frecuencia':
      options = ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"];
      break;
    case 'Desempeño':
      options = ["Muy Bajo", "Bajo", "Promedio", "Alto", "Muy Alto"];
      break;
    default:
      throw new Error("Escala desconocida.");
  }

  const question: Question = {
    ...data,
    options,
  };

  return await questionRepository.create(question);
};

export const getQuestions = async () => {
  return await questionRepository.findAll();
};

export const getQuestion = async (id: string) => {
  const findQuestion = await questionRepository.findById(id);
  if (!findQuestion) {
    throw new Error("La pregunta no se encuentra registrada.");
  }
  return findQuestion;
};

export const updateQuestion = async (id: string, data: CreateQuestionDto) => {
  const findQuestion = await questionRepository.findById(id);
  if (!findQuestion) {
    throw new Error("La pregunta no se encuentra registrada.");
  }

  let options: string[];

  if (data.scaleType) {
    switch (data.scaleType) {
      case 'Likert':
        options = ["Muy Malo", "Malo", "Neutral", "Bueno", "Excelente"];
        break;
      case 'Frecuencia':
        options = ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"];
        break;
      case 'Desempeño':
        options = ["Muy Bajo", "Bajo", "Promedio", "Alto", "Muy Alto"];
        break;
      default:
        throw new Error("Escala desconocida.");
    }
  } else {
    options = findQuestion.options;
  }

  const updatedQuestion = {
    ...findQuestion.toObject(),
    ...data,
    options,
  };

  return await questionRepository.update(id, updatedQuestion);
};