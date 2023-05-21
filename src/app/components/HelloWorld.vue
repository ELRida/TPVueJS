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
          <th scope="col">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>
            <v-icon small class="mr-2"> mdi-pencil </v-icon>
            <v-icon small> mdi-delete </v-icon>
          </td>
        </tr>
        <tr v-for="todo in todos" :key="todo.id">
          <th scope="row">{{ todo.id }}</th>
          <td>{{ todo.title }}</td>
          <td>{{ todo.createdDate }}</td>
          <td>{{ todo.completed }}</td>
          <td>
            <v-icon small class="mr-2">mdi-pencil</v-icon>
            <v-icon small>mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- DIALOG -->
    <v-dialog
      class="dialogDeleteTemplate"
      v-model="addTodo"
      width="500"
      :retain-focus="false"
    >
      <v-card>
        <v-card-title style="justify-content: center">
          <v-sheet class="mb-4 mt-4 text-center title-bold text-delete">
            Êtes-vous sûr de vouloir supprimer ce template ?
          </v-sheet>
        </v-card-title>

        <v-card-actions>
          <v-spacer class="confirmChoice">
            <v-btn
              style="margin-right: 15px"
              class="btn-action-cancel"
              text
              @click="closeDialog()"
              >Retour</v-btn
            >
            <v-btn
              class="btn-action"
              text
              @click="deleteRoom()"
              :loading="loadingDelete"
            >
              Valider</v-btn
            >
          </v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useTodoStore } from "../store/todoStore";

export default {
  name: "HelloWorld",

  data() {
    return {
      task: "",
      editedTask: null,
      tasks: [
        {
          name: "Oui monsieur",
          date: new Date().toLocaleDateString("fr-FR"),
          status: "to-do",
        },
        {
          name: "Oui",
          date: new Date().toLocaleDateString("fr-FR"),
          status: "in-progress",
        },
      ],
      addTodo: false,
      editTodo: false,
      due: null,
      search_room: "",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  methods: {
    addTodoList() {
      this.addTodo = true;
      this.task = "";
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
    submitTask() {
      if (this.task.length === 0) return;

      this.tasks.push({
        name: this.task,
        date: this.due,
        status: "todo",
      });

      this.task = "";
      this.due = null;

      if (this.date === this.due) {
        this.date = null;
      }
    },
    dialogEditTask(index) {
      this.editTodo = true;
      this.task = this.tasks[index].name;

      if (index < 2) {
        this.due = new Date().toLocaleDateString("fr-FR");
      } else {
        this.due = this.tasks[index].date;
      }

      this.editedTask = this.tasks[index];
    },
    editTask() {
      if (!this.editedTask) return;

      this.editedTask.name = this.task;
      this.editedTask.date = this.due;
      this.task = "";
      this.due = null;
      this.editedTask = null;
      this.editTodo = false;
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
  },

  computed: {
    filteredTodo() {
      return this.tasks.filter((task) =>
        task.name.toLowerCase().includes(this.search_room.toLowerCase())
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
</style>
