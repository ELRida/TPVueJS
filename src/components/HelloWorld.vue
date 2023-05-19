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
          <td> <v-icon small class="mr-2" > mdi-pencil </v-icon>
                    <v-icon small> mdi-delete </v-icon>
</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td> <v-icon small class="mr-2"> mdi-pencil </v-icon>
                    <v-icon small > mdi-delete </v-icon>
</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
          <td> <v-icon small class="mr-2"> mdi-pencil </v-icon>
                    <v-icon small> mdi-delete </v-icon>
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
export default {
  name: "HelloWorld",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader/tree/next",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify/tree/next",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Roadmap",
        href: "https://vuetifyjs.com/introduction/roadmap/",
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
    addTodo: false,
  }),
  methods: {
    addTodoList() {
      this.addTodo = true;
    },
    closeDialog() {
      this;
      this.addTodo = false;
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
