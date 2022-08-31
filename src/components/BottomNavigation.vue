<template>
  <v-bottom-navigation dark class="primary">
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >App support <v-icon>device_unknown</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Contact support</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="saveSupport"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader>General information</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>When to contact support</v-list-item-title>
              <v-list-item-subtitle>If you can reproduce the problem and have at least one colleague who experiences the same problem</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          three-line
          subheader
        >
          <v-subheader>Problem</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Online</v-list-item-title>
              <v-list-item-subtitle>I expierence this problem when I'm online</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Offline</v-list-item-title>
              <v-list-item-subtitle>I expierence this problem when I'm offline</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
                
              <v-textarea label="Describe your problem here" v-model="widgets"></v-textarea>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
  </v-bottom-navigation>
</template>
<script>
import mixins from "@/mixins/mixins";
export default {
  name: "BottomNavigation",
  mixins: [mixins],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    saveSupport(){
      this.dialog = false;
      this.$store.dispatch('showSnackbarFailed',['In the prototype it is not yet possible to commit a support ticket', 6000])
    }
  },
};
</script>