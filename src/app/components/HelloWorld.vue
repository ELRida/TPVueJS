<template>
  <v-container>
    <div class="contianer_todo">
      <h1 class="titleTodo">Ma Todolist</h1>
    </div>

    <div class="box_search_add">
      <v-text-field
        placeholder="Recherchez une tâche"
        class="search_todo"
        v-model="search_room"
      />

      <div class="button_add">
        <button class="add_todo" @click="addTodoList()">
          <v-icon class="close_icon">mdi-plus</v-icon>
          Ajouter une tâche
        </button>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tâches</th>
          <th scope="col">Date de création</th>
          <th scope="col">Statut</th>
          <th scope="col">À faire pour</th>
          <th scope="col">Actions</th>
        </tr>
      </thead> 

      <tbody>
        <tr v-for="todo in filteredTodo" :key="todo.id">
          <th scope="row">{{ todo.id }}</th>
          <td>{{ todo.title }}</td>
          <td>{{ todo.createdDate }}</td>
          <td>{{ todo.status }}</td>
          <td>{{ todo.todoDate }}</td>
          <td>
            <v-icon small class="mr-2" @click="dialogEditTask(todo.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteTask(todo.id)">mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </table>

    <v-dialog
      class="dialogDeleteTemplate"
      v-model="addTodo"
      width="500"
      :retain-focus="false"
    >
      <v-card class="dialog_add">
        <v-card-title style="justify-content: center">
          <v-sheet class="mb-4 mt-4 text-center title-bold text-delete">
            Ajouter une tâche
          </v-sheet>
        </v-card-title>

        <div class="box_add">
          <v-text-field
            placeholder="Nom de la tâche"
            class="add_todo"
            v-model="title"
          />
          <div>
            <v-text-field
              class="datapicker_todo"
              type="date"
              label="Date"
              v-model="due"
            />
          </div>
        </div>

        <v-card-actions class="text-center">
          <v-spacer class="confirmChoice">
            <v-btn
              style="margin-right: 15px"
              class="btn-action-cancel"
              text
              @click="closeDialog()"
            >
              Annuler
            </v-btn>
            <v-btn
              class="btn-action"
              text
              @click="submitTask()"
            >
              Valider
            </v-btn>
          </v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      class="dialogDeleteTemplate"
      v-model="editTodo"
      width="500"
      :retain-focus="false"
    >
      <v-card class="dialog_add">
        <v-card-title style="justify-content: center">
          <v-sheet class="mb-4 mt-4 text-center title-bold text-delete">
            Modification de tâche
          </v-sheet>
        </v-card-title>
        <div class="box_add">
          <v-text-field
            placeholder="Nom de la tâche"
            class="add_todo"
            v-model="title"
          />
 
          <div>
            <v-text-field
              class="datapicker_todo"
              type="date"
              label="Date"
              v-model="due"
            />
          </div>
        </div>
        <v-card-actions class="text-center">
          <v-spacer class="confirmChoice">
            <v-btn
              style="margin-right: 15px"
              class="btn-action-cancel"
              text
              @click="editTask()"
            >
              Valider
            </v-btn>
            <v-btn class="btn-action" text @click="closeDialogEdit()">
              Annuler
            </v-btn>
          </v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-snackbar
      v-model="snackbar"
      :timeout="2000">
      {{ textSnackBar }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import store from '../stores/pinia'
import { useTodoStore } from "../stores/todoStore.ts";

const todoStore = useTodoStore(store);
await todoStore.fetchTodos();

export default {
  name: "HelloWorld",
  data() {
    
    return {   
      snackbar: false,
      textSnackBar: "",

      todos: todoStore.todos,
      
      title: "",
      editedTask: null,
      addTodo: false,
      editTodo: false,
      createdDate: null,
      search_room: "",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10), 
    };
  },

  
  methods: {
    addTodoList() {
      this.addTodo = true;
      this.title = "";
      this.due = null;
      if (this.date === this.due) {
        this.date = null;
      }
    },
    
    closeDialog() {
      this.addTodo = false;
    },

    closeDialogEdit() {
      this.editTodo = false;
    },

    async submitTask() {
      if (this.title.length === 0) return; // il faut mettre des notifications toast

      var todo = {
        title : this.title,
        todoDate :  new Date(this.due).toLocaleDateString("fr-FR") + " " + new Date().toLocaleTimeString("fr-FR"),
        status : "à faire",
        createdDate : new Date().toLocaleDateString("fr-FR") + " " + new Date().toLocaleTimeString("fr-FR")
      }
 
      let value = await todoStore.addTodo(todo);
      this.closeDialog();

      this.snackbar = true;
      this.textSnackBar = value;

      if (this.date === this.due) {
        this.date = null; 
      }
    },

    async dialogEditTask(id) {

      let todo = this.todos.find(x => x.id == id);
      this.title = todo.title;
      this.due = todo.createdDate;
      this.editTodo = true;
 
      this.editedTask = todo;
    },

    async editTask() { 
      if (!this.editedTask) return; 
 
      this.editedTask.title = this.title;
      this.editedTask.createdDate = this.due;
      this.editedTask.status = "pas de statut";
      this.editedTask.todoDate = new Date().toLocaleDateString("fr-FR") + " " + new Date().toLocaleTimeString("fr-FR");

      let value = await todoStore.updateTodoStatus(this.editedTask);

      this.snackbar = true;
      this.textSnackBar = value;
    }, 

    async deleteTask(id) {
      this.todos.splice(this.todos.indexOf(this.todos.find(x => x.id === id)), 1);
      let value = await todoStore.removeTodo(id);

      this.snackbar = true;
      this.textSnackBar = value;
    }, 


  },

  computed: {
    filteredTodo() {
      return this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(this.search_room.toLowerCase())
      );
    },
  },
};
</script>

<style>
.contianer_todo {
  padding: 30px;
}
.titleTodo {
  font-size: 32px;
  text-align: center;
  font-weight: 500;
}
.box_search_add {
  display: flex;
  justify-content: space-between;
}
.search_todo .v-input__control {
  width: 450px;
}
.search_todo .v-field__overlay {
  background: none;
}
.button_add {
  background: #759be4;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
  display: flex;
  height: 50px;
  color: white;
}
.add_todo .v-input__control {
  min-width: 150px;
  max-width: 180px;
}
.add_todo .v-field__overlay {
  background: none;
}
.dialog_add {
  padding: 12px;
}
.box_add {
  display: flex;
}
.box_add .v-input--horizontal {
  width: 240px;
}
.datapicker_todo .v-field__overlay {
  background: none;
}
</style>
