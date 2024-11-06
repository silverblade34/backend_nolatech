import { Request, Response, Router } from "express";

const router = Router();

/**
 * http://localhost:3022/reports [POST]
 */

router.get("/", (req: Request, res: Response) => {
  res.send({ data: "MODELOS" });
});

export { router };
