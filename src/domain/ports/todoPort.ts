import Todo from "../entities/todo";

export default interface TodoPort {
  createTodo(todo: Todo): Promise<Todo>;

  getTodos(): Promise<Todo[]>;

  updateTodo(todo: Todo): Promise<Todo>;

  deleteTodo(id: number): Promise<void>;
}
