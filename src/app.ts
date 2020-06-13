import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import { requestLoggerMiddleware } from "./request.logger.middleware";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(requestLoggerMiddleware);

app.get(
  "/todo",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    rep.json([
      {
        id: 1,
        description: "Buy breed",
      },
    ]);
  }
);

app.post(
  "/todo:id",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    console.info(req.body);
    console.info(req.params.id);
    rep.end();
  }
);

app.delete(
  "/todo:id",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    console.info(req.params.id);
    rep.end();
  }
);

app.put(
  "/todo",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    console.info(req.body);
    rep.end();
  }
);
export { app };
