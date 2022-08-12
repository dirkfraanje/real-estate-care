<template>
  <v-card class="mx-auto">
    <ToolbarHeader text="Settings" />
    <v-list two-line subheader>
      <v-subheader>General</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Profile avatar</v-list-item-title>
          <v-list-item-subtitle>Change your avatar</v-list-item-subtitle>
         <div><v-btn
            icon
            x-large
            @click="changeAvatar">
            <v-avatar
              color="teal"
              size="46">
              <span class="text-h6">D</span>
            </v-avatar>
          </v-btn ><v-alert v-show="showAvatarAlert"
      dense
      outlined
      type="warning">Changing the avatar is not possible in this prototype
    </v-alert></div>
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
      <v-subheader>Hangout notifications</v-subheader>

      <v-list-item-group v-model="settings" multiple>
        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Hangouts message</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Video sounds</v-list-item-title>
              <v-list-item-subtitle>Hangouts video call</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Invites</v-list-item-title>
              <v-list-item-subtitle
                >Notify when receiving invites</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
//Instellingen (beheer)
//In dit scherm komen instellingen zoals de accountgegevens van de inspecteur, de avatar, het wachtwoord,
// meldingen tonen en geluiden, etc.
import ToolbarHeader from "@/components/ToolbarHeader.vue";
export default {
  components: {
    ToolbarHeader,
  },
  data() {
    return {
      settings: [],
      darkModeEnabled: localStorage.getItem('dark_mode') === 'true' ? true : false,
      showAvatarAlert: false
    };
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_mode", this.$vuetify.theme.dark);
    },
    changeAvatar(){
      this.showAvatarAlert = !this.showAvatarAlert;
    }
  },
  computed: {
    themeIcon() {
      return this.darkModeEnabled ? "light_mode" : "dark_mode";
    },
  },
};
</script>