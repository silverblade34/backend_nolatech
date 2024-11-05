import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

const getEmployee = ({ body }: Request, res: Response) => {
  try {
    res.send(body);
  } catch (e) {
    handleHttp(res, "ERROR_GET_ITEM");
  }
};
