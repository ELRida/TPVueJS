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
        const modifiedTodos = todos.map(todo => ({...todo,
          createdDate: todo.createdDate.indexOf("/") < 0 ? new Date(todo.createdDate).toLocaleDateString("fr-FR") + " " + new Date(todo.createdDate).toLocaleTimeString("fr-FR") : todo.createdDate,
          todoDate: todo.todoDate.indexOf("/") < 0 ? new Date(todo.todoDate).toLocaleDateString("fr-FR") + " " + new Date(todo.todoDate).toLocaleTimeString("fr-FR") : todo.todoDate,
        }));
        this.todos = modifiedTodos;
      } catch (error) {
        return 'Erreur lors de la récupération des tâches';
      }
    }, 
 
    async addTodo(todo: Todo) {
      try { 
        const todoService = new TodoService();
        const newTodo = await todoService.createTodo(todo);
        this.todos.push(newTodo);
      } catch (error) {
        return 'Erreur lors de l\'ajout de la tâche : ' + todo.id;
      }
      return "Tâche ajoutée";
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
        return 'Erreur lors de la mise à jour de la tâche : ' + todo.id;
      }
      return "Tâche mis à jour";
    },

    async removeTodo(todoId: number) {
      try {
        const todoService = new TodoService(); 
        await todoService.deleteTodo(todoId);
        this.todos = this.todos.filter((t) => t.id !== todoId);
      } catch (error) {
        return 'Erreur lors de la suppression de la tâche id : ' + todoId;
      }
      return "Tâche supprimée";
    },
  },
});
