import "dotenv/config";
import express from "express";
import { router } from "./routes/index.route";
import cors from "cors";
import db from "./config/mongo.config";
import rateLimiter from "./config/rate-limit.config";
import swaggerUi from "swagger-ui-express";
import { createAdminUserIfNeeded } from "./utils/create-admin.handle";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./config/swagger.config";

const PORT = process.env.PORT || 3001;
const app = express();

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(router);

db()
    .then(async () => {
        console.log("Conexion Ready");
        await createAdminUserIfNeeded();
    })
    .catch((err) => console.error("Error en la conexión a la base de datos:", err));


app.listen(PORT, () => console.log(`Listo en el puerto ${PORT}`));

export default app; 