<template>
  <v-card class="mx-auto">
    <ToolbarHeader text="Settings" />
    <v-list two-line subheader>
      <v-subheader>General</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Account</v-list-item-title>
          <v-list-item-subtitle>Account data</v-list-item-subtitle>
          <v-row class="mt-2"
            ><v-col cols="12">
              <p>Username: {{ userName }}</p>
              <p>Region: Gelderland</p>
              <p>Manager: Mr. L. Oi</p>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Profile avatar</v-list-item-title>
          <v-list-item-subtitle>Change your avatar</v-list-item-subtitle>
          <div>
            <v-btn icon x-large @click="changeAvatar">
              <v-avatar color="primary" size="46">
                <span class="text-h6">D</span>
              </v-avatar>
            </v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Theme</v-list-item-title>
          <v-switch
            v-model="darkModeEnabled"
            inset
            @change="toggleDarkMode"
            :prepend-icon="themeIcon"
          ></v-switch>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader two-line flat>
      <v-subheader>Notifications</v-subheader>

      <v-list-item-group v-model="settings" multiple>
        <v-list-item @click="showWarning">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Notify</v-list-item-title>
              <v-list-item-subtitle>Show notifications</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item @click="showWarning">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle
                >Play sound when a new inspection is
                assigned</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import ToolbarHeader from "@/components/ToolbarHeader.vue";
export default {
  components: {
    ToolbarHeader,
  },
  data() {
    return {
      settings: [],
      darkModeEnabled:
        localStorage.getItem("dark_mode") === "true" ? true : false,
      showAvatarAlert: false,
      showPassword: false,
      userName: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    };
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_mode", this.$vuetify.theme.dark);
    },
    changeAvatar() {
      this.$store.dispatch("showSnackbarFailed", [
        "Changing the avatar is not possible in the prototype",
        5000,
      ]);
    },
    showWarning() {
      this.$store.dispatch("showSnackbarFailed", [
        "Functionality for this setting is not available in the prototype",
        4000,
      ]);
    },
  },
  computed: {
    themeIcon() {
      return this.darkModeEnabled ? "light_mode" : "dark_mode";
    },
  },
};
</script>