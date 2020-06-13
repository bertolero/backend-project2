import { app } from "./app";
import * as http from "http";
import * as mongoose from "mongoose";

const PORT = 8080;
const MONGO_URI = "mongodb://127.0.0.1:27017";
const server = http.createServer(app);

server.listen(PORT);
server.on("listening", async () => {
  console.log(`Listening on port ${PORT}`);
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("open", () => {
    console.error("Connected");
  });
  mongoose.connection.on("error", (err: any) => {
    console.error(err);
  });
});
