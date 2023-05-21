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
      ></v-text-field>
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
          <th scope="col">À faire pour le</th>
          <th scope="col">Statut</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in filteredTodo" :key="index">
          <th scope="row">1</th>
          <td>{{task.name}}</td>
          <td>{{ task.date }}</td>
          <td>{{ task.status }}</td>
          <td> <v-icon small class="mr-2" @click="dialogEditTask(index)"> mdi-pencil </v-icon>
                    <v-icon small @click="deleteTask(index)"> mdi-delete </v-icon>
</td>
        </tr>
    
    
      </tbody>
    </table>
    <!-- DIALOG -->
        <!-- ADD DIALOG -->
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
        v-model="task"
      ></v-text-field>
      <div >
        
        <v-text-field class="datapicker_todo" type="date" label="Date" v-model="due"></v-text-field>


      
      </div>
    </div>
        <v-card-actions class="text-center">
          
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
              @click="submitTask()"
              :loading="loadingDelete"
            >
              Valider</v-btn
            >
          </v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>


       <!-- EDIT DIALOG -->
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
        v-model="task"
      ></v-text-field>
      <div >
        
        <v-text-field class="datapicker_todo" type="date" label="Date" v-model="due"></v-text-field>


      
      </div>
    </div>
        <v-card-actions class="text-center">
          
          <v-spacer class="confirmChoice">
            <v-btn
              style="margin-right: 15px"
              class="btn-action-cancel"
              text
              @click="closeDialogEdit()"
              >Retour</v-btn
            >
            <v-btn
              class="btn-action"
              text
              @click="editTask()"
            >
              Valider</v-btn
            >
          </v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--DELETE-->

  
  </v-container>
</template>

<script>
export default {
  
  name: "HelloWorld",
 

  data() {
  return {
    task:'',
    editedTask: null,
    tasks: [
      {
        name: 'Oui monsieur',
        date: new Date().toLocaleDateString('fr-FR'),
        status: 'to-do',
      },
      {
        name: 'Oui',
        date: new Date().toLocaleDateString('fr-FR'),
        status: 'in-progress',
      }
    ],
    addTodo: false,
    editTodo: false,
    due: null,
    search_room: "",
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  };
},
  methods: {
    addTodoList() {
      this.addTodo = true;
      this.task = '';
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
    status: 'todo'
  });

  this.task = '';
  this.due = null; 

  if (this.date === this.due) {
    this.date = null;
  }
},
dialogEditTask(index){
  this.editTodo = true;
  this.task = this.tasks[index].name;
  
  if (index < 2) { 
    this.due = new Date().toLocaleDateString('fr-FR');
  } else {
    this.due = this.tasks[index].date;
  }
  
  this.editedTask = this.tasks[index];
},
editTask() {
  if (!this.editedTask) return;

  this.editedTask.name = this.task;
  this.editedTask.date = this.due;
  this.task = '';
  this.due = null;
  this.editedTask = null;
  this.editTodo = false;
},
    deleteTask(index){
      this.tasks.splice(index, 1 );
    }
  },

  computed:{
    filteredTodo() {
      return this.tasks.filter((task) =>
        task.name.toLowerCase().includes(this.search_room.toLowerCase())
      );
    },
  }

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
.dialog_add{
  padding: 12px;
}
.box_add{
  display: flex;
}
.box_add .v-input--horizontal{
  width: 240px;
}
.datapicker_todo .v-field__overlay{
  background: none;
}
</style>
