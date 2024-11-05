import "dotenv/config";
import express from "express";
import { router } from "./routes";
import cors from "cors";
import db from "./config/mongo";

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
db().then(() => console.log("Conexion Ready"));

app.listen(PORT, () => console.log(`Listo en el puerto ${PORT}`));
