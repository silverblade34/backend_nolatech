import { Response } from "express";

const handleSuccess = (res: Response, message: string, data: any, statusCode: number = 200) => {
  res.status(statusCode).json({ message, data });
};

export { handleSuccess };
