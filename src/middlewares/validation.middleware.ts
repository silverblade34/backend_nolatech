import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export function validationMiddleware(type: any): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoObject = plainToInstance(type, req.body);
    const errors: ValidationError[] = await validate(dtoObject);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      res
        .status(400)
        .json({ message: "Validation failed", errors: errorMessages });
      return;
    }

    return next();
  };
}
