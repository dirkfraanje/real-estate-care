<template>
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
          ><v-icon>notifications_none</v-icon></v-btn
        >
      </template>
      <v-list>
        <v-list-item
          v-for="(notification, i) in this.notifications"
          :key="i"
          @click="() => {}"
        >
          <v-list-item-title>{{ notification.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon>
      <v-icon @click="$router.push('settings')">settings</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      notifications: [
        {
          title: "You have new inspections assigned to you",
        },
        {
          title: "Check the inspection for Anjelierstraat 38 again",
        },
      ],
    };
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