import * as express from "express";
import { TodoModel } from "../model/todo";

// eslint-disable-next-line new-cap
const todoRoutes = express.Router();

todoRoutes.get(
  "/todo",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    TodoModel.find()
      .then((items: any) => {
        const itemsReturn = items.map((item: any) => {
          return {
            id: item._id,
            description: item.description,
          };
        });
        rep.json(itemsReturn);
      })
      .catch((err) => {
        rep.status(500);
        rep.end();
        console.error("Error", err);
      });
  }
);

todoRoutes.post(
  "/todo",
  async (
    req: express.Request,
    rep: express.Response,
    next: express.NextFunction
  ) => {
    const description = req.body["description"];
    const item = new TodoModel({ description: description });
    await item.save();
    rep.end();
  }
);

todoRoutes.put(
  "/todo/:id",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    const description = req.body["description"];
    const id = req.params["id"];
    TodoModel.findByIdAndUpdate(id, {
      description: description,
    });
    rep.end();
  }
);

todoRoutes.delete(
  "/todo/:id",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    const id = req.params["id"];
    TodoModel.findByIdAndRemove(id);
    rep.end();
  }
);

export { todoRoutes };
