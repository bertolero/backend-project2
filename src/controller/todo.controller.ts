import * as express from "express";
import * as mongodb from "mongodb";
import { MongoHelper } from "../helper/mongo.helper";

// eslint-disable-next-line new-cap
const todoRoutes = express.Router();

const getCollection = () => {
  return MongoHelper.client.db("todo").collection("todos");
};

todoRoutes.get(
  "/todo",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    const collection = getCollection();
    collection.find({}).toArray((err, items) => {
      if (err) {
        rep.status(500);
        rep.end();
        console.error("Error", err);
      } else {
        const itemsReturn = items.map((item) => {
          return {
            id: item._id,
            description: item.description,
          };
        });
        rep.json(itemsReturn);
      }
    });
  }
);

todoRoutes.post(
  "/todo",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    const description = req.body["description"];
    const collection = getCollection();
    collection.insertOne({ description: description });
    rep.end();
  }
);

todoRoutes.delete(
  "/todo/:id",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    const id = req.params["id"];
    const collection = getCollection();
    collection.findOneAndDelete({ _id: new mongodb.ObjectId(id) });
    rep.end();
  }
);

todoRoutes.put(
  "/todo/:id",
  (req: express.Request, rep: express.Response, next: express.NextFunction) => {
    const description = req.body["description"];
    const id = req.params["id"];
    const collection = getCollection();
    collection.findOneAndUpdate(
      { _id: new mongodb.ObjectId(id) },
      {
        $set: {
          description: description,
        },
      }
    );
    rep.end();
  }
);

export { todoRoutes };
