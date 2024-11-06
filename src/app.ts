import "dotenv/config";
import express from "express";
import { router } from "./routes/index.route";
import cors from "cors";
import db from "./config/mongo";
import rateLimiter from "./config/rate-limit";

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.use(rateLimiter); 

app.use(router);
db().then(() => console.log("Conexion Ready"));

app.listen(PORT, () => console.log(`Listo en el puerto ${PORT}`));
