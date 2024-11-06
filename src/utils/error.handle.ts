import { Response } from "express";

const handleHttp = (res: Response, error: string, statusCode?: number) => {
  res.status(statusCode || 500);
  res.send({ message: error, data: null });
};

export { handleHttp };
