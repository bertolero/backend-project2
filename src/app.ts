import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as swaggerUI from "swagger-ui-express";

import { requestLoggerMiddleware } from "./middleware/request.logger.middleware";
import "./controller/todo.controller";

import { RegisterRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(requestLoggerMiddleware);
// eslint-disable-next-line new-cap
RegisterRoutes(app);

try {
  const swaggerDocument = require("./swagger.json");
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch (err) {
  console.error(err);
}

export { app };
