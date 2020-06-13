import * as express from "express";

const todoRoutes = express.Router();

todoRoutes.get(
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

todoRoutes.post(
  "/todo:id",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    console.info(req.body);
    console.info(req.params.id);
    rep.end();
  }
);

todoRoutes.delete(
  "/todo:id",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    console.info(req.params.id);
    rep.end();
  }
);

todoRoutes.put(
  "/todo",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    console.info(req.body);
    rep.end();
  }
);

export { todoRoutes };
