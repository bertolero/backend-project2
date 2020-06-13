import { ITodo, TodoModel } from "../model/todo";
import { BodyProp, Controller, Delete, Get, Post, Put, Route } from "tsoa";

// eslint-disable-next-line new-cap
@Route("/todo")
/**
 * Controller class
 */
export class TodoController extends Controller {
  // eslint-disable-next-line new-cap
  @Get()
  // eslint-disable-next-line require-jsdoc
  public getAll(): Promise<ITodo[]> {
    return TodoModel.find()
      .then((items: any) => {
        const itemsReturn = items.map((item: any) => {
          return {
            id: item._id,
            description: item.description,
          };
        });
        return itemsReturn;
      })
      .catch((err) => {
        super.setStatus(500);
        console.error("Error", err);
      });
  }

  // eslint-disable-next-line new-cap
  @Post()
  // eslint-disable-next-line new-cap,require-jsdoc
  public create(@BodyProp() description: string): void {
    const item = new TodoModel({ description: description });
    item.save();
  }

  // eslint-disable-next-line new-cap
  @Put("/{id}")
  // eslint-disable-next-line new-cap,require-jsdoc
  public update(id: string, @BodyProp() description: string): void {
    TodoModel.findByIdAndUpdate(id, {
      description: description,
    });
  }

  // eslint-disable-next-line new-cap
  @Delete("/{id}")
  // eslint-disable-next-line require-jsdoc
  public delete(id: string): void {
    TodoModel.findByIdAndRemove(id);
  }
}
