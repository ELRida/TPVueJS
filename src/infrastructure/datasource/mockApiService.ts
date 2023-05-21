import Todo from "../../domain/entities/todo";
import axios from "axios";

const API_BASE_URL = "https://6467dde160c8cb9a2c9edf70.mockapi.io";

export default class MockApiService {

  async createTodo(todo: Todo): Promise<Todo> {
    try {
      const response = await axios.post(`${API_BASE_URL}/todo`, todo);
      return response.data;
    } catch (error) {
      // Gérer les erreurs de la requête
      throw new Error("Erreur lors de la création de la tâche.");
    }
  }

  async getTodos(): Promise<Todo[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/todo`);
      return response.data;
    } catch (error) {
      // Gérer les erreurs de la requête
      throw new Error("Erreur lors de la récupération des tâches.");
    }
  }

  async getTodoById(todoId: string): Promise<Todo> {
    try {
      const response = await axios.get(`${API_BASE_URL}/todo/${todoId}`);
      return response.data;
    } catch (error) {
      // Gérer les erreurs de la requête
      throw new Error(`Erreur lors de la récupération de la tâche id : ${todoId}`);
    }
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    try {
      const response = await axios.put(`${API_BASE_URL}/todo/${todo.id}`, todo);
      return response.data;
    } catch (error) {
      // Gérer les erreurs de la requête
      throw new Error(`Erreur lors de la mise à jour de la tâche id : ${todo.id}`);
    }
  }

  async deleteTodo(todoId: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/todo/${todoId}`);
    } catch (error) {
      // Gérer les erreurs de la requête
      throw new Error(`Erreur lors de la suppression de la tâche id : ${todoId}`);
    }
  }
}
