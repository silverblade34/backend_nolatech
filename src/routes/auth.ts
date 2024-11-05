import { Request, Response, Router } from "express";

const router = Router();

/**
 * http://localhost:3022/auth [POST]
 */

router.get("/", (req: Request, res: Response) => {
  res.send({ data: "MODELOS" });
});

export { router };
