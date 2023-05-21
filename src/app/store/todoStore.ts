import { defineStore } from 'pinia';
import Todo from '../../domain/entities/todo';
import TodoService from '../../domain/TodoService';


export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
  }),

  actions: {
    async fetchTodos() {
      try {
        const todoService = new TodoService();
        const todos = await todoService.getTodos();
        this.todos = todos;
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    },

    async addTodo(todo: Todo) {
      try {
        const todoService = new TodoService();
        const newTodo = await todoService.createTodo(todo);
        this.todos.push(newTodo);
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche :', error);
      }
    },

    async updateTodoStatus(todo: Todo) {
      try {
        const todoService = new TodoService();
        const updatedTodo = await todoService.updateTodo(todo);
        const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
      }
    },

    async removeTodo(todo: Todo) {
      try {
        const todoService = new TodoService();
       if (typeof todo.id === 'number') {
          await todoService.deleteTodo(todo.id);
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        } else {
          console.error('Erreur lors de la suppression de la tâche : identifiant invalide');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche :', error);
      }
    },
  },
});
