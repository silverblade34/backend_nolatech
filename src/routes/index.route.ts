import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";

const PATH_ROUTER = `${__dirname}`;

const router = Router();

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER)
  .filter((fileName) => {
    return fileName.endsWith(".route.ts");
  })
  .forEach((fileName) => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== "index") {
      import(path.resolve(PATH_ROUTER, `${cleanName}.route.ts`)).then((moduleRouter) => {
        router.use(`/api/${cleanName}`, moduleRouter.router);
      }).catch((err) => {
        console.error(`Error al cargar la ruta: ${cleanName}`, err);
      });
    }
  });

export { router };
