<template>
  <div>
    <v-app-bar dense dark height="60">
      <div>
        <v-img
          :src="require('../assets/logo_rec.svg')"
          contain
          height="40"
          width="40"
        />
      </div>
      <v-toolbar-title>
        <div class="pa-2">
          <p class="mb-n2 mt-4 nav-font nav-title">Real Estate Care</p>
          <p class="nav-font nav-sub-title">Caring is in our nature</p>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer
      ><v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-2" v-bind="attrs" v-on="on" icon
            ><v-badge
              v-if="notificationsCount > 0"
              overlap
              :content="notificationsCount"
              ><v-icon>notifications</v-icon></v-badge
            >
            <v-icon v-if="notificationsCount === 0"
              >notifications</v-icon
            ></v-btn
          >
        </template>
        <v-list>
          <v-list-item
            v-for="(notification, i) in this.$store.state.notifications"
            :key="i"
            @click="() => {}"
          >
            <v-list-item-title class="mr-2 caption">{{
              notification.title
            }}</v-list-item-title>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  @click="dismissNotification(notification)"
                  v-bind="attrs"
                  v-on="on"
                  color="teal"
                  >highlight_off</v-icon
                >
              </template>
              <span>Dismiss</span>
            </v-tooltip>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon @click="$router.push('settings')">settings</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
const notificationLocalWarningShown = "notificationLocalWarningShown";
export default {
  data() {
    return {};
  },
  computed: {
    notificationsCount() {
      return this.$store.state.notifications.length;
    },
  },
  methods: {
    dismissNotification(notification) {
      if (!(localStorage.getItem(notificationLocalWarningShown) === "true")) {
        this.$alert(
          "For this prototype the notification will not be permenantly removed. It will be shown again after the app is restarted.",
          "Warning",
          "warning"
        );
        localStorage.setItem(notificationLocalWarningShown, true);
      }
      this.$store.dispatch("dismissNotification", notification);
    },
  },
};
</script>

<style scoped>
.nav-font {
  font-family: "Agency FB";
  color: #e1e3e3;
}
.nav-title {
  font-size: 1em;
}
.nav-sub-title {
  font-size: 0.6em;
  letter-spacing: 0.07em;
}
</style>