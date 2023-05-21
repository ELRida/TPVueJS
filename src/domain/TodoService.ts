import TodoPorts from "./ports/todoPort";
import Todo from "./entities/todo";
import MockApiService from "../infrastructure/datasource/mockApiService";


export default class TodoService implements TodoPorts {
  private mockApiService: MockApiService;

  constructor() {
    this.mockApiService = new MockApiService();
  }

  async createTodo(todo: Todo): Promise<Todo> {
    // Appelle le service de communication externe pour créer une nouvelle tâche
    const createdTodo = await this.mockApiService.createTodo(todo);
    return createdTodo;
  }

  async getTodos(): Promise<Todo[]> {
    // Appelle le service de communication externe pour récupérer toutes les tâches
    const todos = await this.mockApiService.getTodos();
    return todos;
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    // Appelle le service de communication externe pour mettre à jour une tâche
    const updatedTodo = await this.mockApiService.updateTodo(todo);
    return updatedTodo;
  }

  async deleteTodo(todoId: number): Promise<void> {
    // Appelle le service de communication externe pour supprimer une tâche
    await this.mockApiService.deleteTodo(todoId);
  }
}