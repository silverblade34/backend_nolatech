import { SwaggerOptions } from "swagger-ui-express";

const swaggerOptions: SwaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Nolatech",
            version: "1.0.0",
            description: "API RESTful para un sistema de evaluación 360 grados de empleados remotos en una empresa de desarrollo de aplicaciones.",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                CreateEmployeeDto: {
                    type: "object",
                    properties: {
                        name: { type: "string", description: "Nombre del empleado" },
                        position: { type: "string", description: "Posición del empleado" },
                        departmentId: { type: "string", description: "ID del departamento" },
                        email: { type: "string", format: "email", description: "Correo electrónico del empleado" },
                        phone: { type: "string", description: "Teléfono del empleado" },
                        hireDate: { type: "string", format: "date", description: "Fecha de contratación" },
                        username: { type: "string", description: "Nombre de usuario del empleado" },
                        password: { type: "string", description: "Contraseña del empleado" },
                        role: {
                            type: "string",
                            enum: ["manager", "employee"],
                            description: "Rol del empleado",
                        },
                    },
                    required: [
                        "name",
                        "position",
                        "departmentId",
                        "email",
                        "phone",
                        "hireDate",
                        "username",
                        "password",
                        "role",
                    ],
                },
                CreateQuestionDto: {
                    type: "object",
                    properties: {
                        text: { type: "string", description: "Texto de la pregunta" },
                        evaluationId: { type: "string", description: "ID de la evaluación a la que pertenece" },
                        scaleType: {
                            type: "string",
                            enum: ["Likert", "Frecuencia", "Desempeño"],
                            description: "Tipo de escala de la pregunta",
                        },
                    },
                    required: ["text", "evaluationId", "scaleType"],
                },
                CreateDepartmentDto: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Nombre del departamento",
                        },
                    },
                    required: ["name"],
                },
                CreateEvaluationDto: {
                    type: "object",
                    properties: {
                        period: { type: "string", description: "Periodo de la evaluación" },
                        status: {
                            type: "string",
                            enum: ["draft", "submitted", "completed"],
                            description: "Estado de la evaluación",
                        },
                        type: {
                            type: "string",
                            enum: ["self-assessment", "peer-assessment", "manager-assessment"],
                            description: "Tipo de evaluación",
                        },
                        employeeId: {
                            type: "string",
                            description: "ID del empleado evaluado",
                        },
                        evaluators: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            description: "Lista de IDs de los evaluadores",
                        },
                    },
                    required: ["period", "status", "type", "employeeId", "evaluators"],
                },
                RegisterUserDto: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Nombre del usuario",
                        },
                        position: {
                            type: "string",
                            description: "Cargo del usuario",
                        },
                        departmentId: {
                            type: "string",
                            description: "ID del departamento al que pertenece el usuario",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "Correo electrónico del usuario",
                        },
                        phone: {
                            type: "string",
                            description: "Número de teléfono del usuario",
                        },
                        hireDate: {
                            type: "string",
                            format: "date",
                            description: "Fecha de contratación del usuario",
                        },
                        username: {
                            type: "string",
                            description: "Nombre de usuario para el login",
                        },
                        password: {
                            type: "string",
                            description: "Contraseña del usuario",
                        },
                    },
                    required: ["name", "position", "departmentId", "email", "phone", "hireDate", "username", "password"],
                },
                LoginUserDto: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                            description: "Nombre de usuario",
                        },
                        password: {
                            type: "string",
                            description: "Contraseña del usuario",
                        },
                    },
                    required: ["username", "password"],
                },
                CreateReportDto: {
                    type: "object",
                    properties: {
                        evaluationId: { type: "string", description: "ID de la evaluación a la que corresponde el reporte" },
                        answers: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    questionId: { type: "string", description: "ID de la pregunta respondida" },
                                    answer: { type: "string", description: "Respuesta dada a la pregunta" },
                                },
                                required: ["questionId", "answer"],
                            },
                        },
                    },
                    required: ["evaluationId", "answers"],
                },
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3001}/api`,
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export default swaggerOptions;
