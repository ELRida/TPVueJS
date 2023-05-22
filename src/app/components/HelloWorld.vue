<template>
  <v-container>
    <div class="contianer_todo">
      <h1 class="titleTodo">Ma Todolist</h1>
    </div>

    <div class="box_search_add">
      <v-text-field
        placeholder="Recherchez une tâche"
        class="search_todo"
        v-model="search_task"
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
          <th scope="col">À faire pour le</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="todo in filteredTodo" :key="todo.id">
          <th scope="row">{{ todo.id }}</th>
          <td><span :class="{'finished': todo.status === 'terminée'}">{{ todo.title }}</span></td>
          <td><span :class="{'finished': todo.status === 'terminée'}">{{ todo.createdDate }}</span></td>
          <td><span class="pointer" @click="changeStatus(todo)"
              :class="{'text-danger': todo.status === 'à faire',
                        'text-warning': todo.status === 'en cours',
                        'text-success': todo.status === 'terminée',
            
            }"
            >{{ firstCharUpper(todo.status) }}</span></td>
          <td><span :class="{'finished': todo.status === 'terminée'}">{{ todo.todoDate }}</span></td>
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
      class=" dialogAddTodo"
      v-model="addTodo"
      width="500"
      :retain-focus="false"
    >
      <v-card class="dialog_add">
        <v-card-title style="justify-content: center"
>
          <v-sheet class="mb-4 mt-4 text-center title-bold text-delete">
            Ajouter une tâche
          </v-sheet>
        </v-card-title>
        <v-text-field
            placeholder="Nom de la tâche"
            class="add_todo"
            v-model="title"
          />
        <div class="box_add">
          <div class="title_todo">
            <v-text-field
              type="time"
              label="Date"
              v-model="timeCreate"
            />
          </div>
          <div>
            <v-text-field
              class="datapicker_todo"
              type="date"
              label="Date"
              v-model="addTodoDate"
            />
          </div>
        </div>
       

        <v-card-actions class="text-center">
          <v-spacer class="confirmChoice">
            <v-btn
              style="margin-right: 15px"
              class="btn-action-cancel background_button_back"
              text
              @click="closeDialog()"
            >
              Annuler
            </v-btn>
            <v-btn
              class="btn-action background_button_add"
              text
              @click="submitTask()"
            >
              Valider
            </v-btn>
          </v-spacer>
          <template>
</template>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      class=" dialogEditTodo"
      v-model="editTodo"
      width="500"
      :retain-focus="false"
    >
      <v-card class="dialog_add">
        <v-card-title style="justify-content: center">
          <v-sheet class="mb-4 mt-4 text-center title-bold text-delete">
            Modification de la tâche
          </v-sheet>
        </v-card-title>
        <v-text-field
            placeholder="Nom de la tâche"
            class="add_todo"
            v-model="title"
          />
        <div class="box_add">
          <div class="title_todo">
            <v-text-field
              type="time"
              label="Heure"
              v-model="timeCreate"
            />
          </div>
          <div>
            <v-text-field
              class="datapicker_todo"
              type="date"
              label="Date"
              v-model="modifyTodoDate"
            />
          </div>
        </div>
        <v-card-actions class="text-center">
          <v-spacer class="confirmChoice">
            <v-btn
              style="margin-right: 15px"
              class="btn-action-cancel background_button_add "
              text
              @click="editTask()"
            >
              Valider
            </v-btn>
            <v-btn class="btn-action background_button_back" text @click="closeDialogEdit()">
              Annuler
            </v-btn>
          </v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ textSnackBar }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import store from "../stores/pinia";
import { useTodoStore } from "../stores/todoStore.ts";

const todoStore = useTodoStore(store);
let value = await todoStore.fetchTodos();


export default {
  name: "TodoApp",
  data() {

    return {
      snackbar: false,
      textSnackBar: "",
      modifyTodoDate: null,
      addTodoDate: null,
      title: "",
      editedTask: null,
      addTodo: false,
      editTodo: false,
      createdDate: null,
      search_task: "",
      timeCreate: "",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      status: ["à faire", "en cours", "terminée"],
    };
  },

  methods: {
    addTodoList() {
      this.addTodo = true;
      this.title = "";
      this.timeCreate="";
      this.addTodoDate = null;
      if (this.date === this.addTodoDate) {
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
      if (this.title.length === 0) return; 

      var todo = {
        title : this.title,
        todoDate :  new Date(this.addTodoDate).toLocaleDateString("fr-FR") + " " + new Date("2001-11-12T"+this.timeCreate).toLocaleTimeString("fr-FR").split('T')[0],
        status : "à faire",
        createdDate : new Date().toLocaleDateString("fr-FR") + " " + new Date().toLocaleTimeString("fr-FR")
      }
 
      let value = await todoStore.addTodo(todo);
      this.closeDialog();

      this.snackbar = true;
      this.textSnackBar = value;

      if (this.date === this.addTodoDate) {
        this.date = null;
      }
    },

    async dialogEditTask(id) {
      let todo = this.todos.find((x) => x.id === id);
      this.title = todo.title;
      this.editTodo = true;
      this.timeCreate = todo.todoDate.substring(11, 16);
      this.modifyTodoDate = this.formattedDueDate(todo.todoDate.substring(0, 10));

      this.editedTask = todo;
    },

    async editTask() {
      if (!this.editedTask) return;

      this.editedTask.title = this.title;
      this.editedTask.todoDate = new Date(this.modifyTodoDate).toLocaleDateString("fr-FR") + " " +  new Date("2001-11-12T"+this.timeCreate).toLocaleTimeString("fr-FR").split('T')[0];

      let value = await todoStore.updateTodoStatus(this.editedTask);

      this.closeDialogEdit();
      this.snackbar = true;
      this.textSnackBar = value;
      this.editTodo = false;
    },
    
    firstCharUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    async deleteTask(id) {
      this.todos.splice(
        this.todos.indexOf(this.todos.find((x) => x.id === id)),
        1
      );
      let value = await todoStore.removeTodo(id);

      this.snackbar = true;
      this.textSnackBar = value;
    },

    async changeStatus(todo) {
      let newIndex = this.status.indexOf(todo.status) + 1;
      if (newIndex >= this.status.length) newIndex = 0;
      const newStatus = this.status[newIndex];

      todo.status = newStatus;

      let value = await todoStore.updateTodoStatus(todo);

      this.snackbar = true;
      this.textSnackBar = value;
    },

    formattedDueDate(date) {  
      if (date) {
          const [day, month, year] = date.split("/");
          const formattedDate = new Date(year + "-" + month + "-" + day);
        return formattedDate.toISOString().split('T')[0];
      }
      return null;
    },
  },

  computed: {
    todos() {
      if (value) {
        this.snackbar = true
        this.textSnackBar = value
      }
      return todoStore.todos
    },
    filteredTodo() {
      return this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(this.search_task.toLowerCase())
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
  max-width: 100%;
  margin-bottom: 20px;
}
.title_todo .v-field__input{
  background-color: revert;
}
.title_todo .v-input__control{
  min-width: 50px;
  max-width: 150px;
}
.add_todo .v-field__overlay {
  background: none;
}
.dialog_add {
  padding: 12px;
}
.box_add {
  display: flex;
  justify-content: space-between;
}
.box_add .v-input--horizontal {
  width: 240px;
}
.datapicker_todo .v-field__overlay {
  background: none;
}
.pointer {
  cursor: pointer;
}
.finished {
  text-decoration: line-through;
}
.background_button_back{
  background: #df4f5d;
  color: white !important;
}
.background_button_add{
  background: #7edb82;
  color: white !important;

}
</style>
