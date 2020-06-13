import { app } from "./app";
import * as http from "http";
import { MongoHelper } from "./mongo.helper";

const PORT = 8080;
const server = http.createServer(app);

server.listen(PORT);
server.on("listening", async () => {
  console.log(`Listening on port ${PORT}`);
  try {
    await MongoHelper.connect("mongodb://127.0.0.1:27017");
    console.error("Connected");
  } catch (err) {
    console.error(err);
  }
});
