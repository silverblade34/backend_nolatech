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
