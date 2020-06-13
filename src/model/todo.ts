import * as mongoose from "mongoose";

interface ITodo {
  _id: string;
  description: string;
}

const TodoSchema = new mongoose.Schema({
  description: String,
});

const TodoModel = mongoose.model("todo", TodoSchema, "todo");

export { TodoModel, ITodo };
