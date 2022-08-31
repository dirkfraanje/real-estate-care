<template>
  <v-app
    ><div>
      <TopNavigation v-if="!isLoginView" />
    </div>
    <v-main>
      <v-snackbar
        top
        :color="this.$store.state.snackbarcolor"
        :value="showMainSnackbar"
        >{{ mainSnackbarText }} <v-btn text class="ml-2" @click="closeSnackbar">Close</v-btn>
      </v-snackbar>
      <router-view /> </v-main
    >
    <BottomNavigation v-if="!isLoginView" />
  </v-app>
</template>

<script>
import TopNavigation from "@/components/TopNavigation.vue";
import BottomNavigation from "@/components/BottomNavigation";

export default {
  name: "App",
  components: {
    TopNavigation,
    BottomNavigation,
  },
  data: () => ({}),
  computed: {
    isLoginView() {
      return this.$route.name === "login";
    },
    showMainSnackbar() {
      return this.$store.state.showMainSnackbar;
    },
    mainSnackbarText() {
      return this.$store.state.mainSnackbarText;
    },
  },
  methods:{
    closeSnackbar(){
      this.$store.dispatch('closeSnackbar')
    }
  },
  created() {
    this.$store.dispatch("fetchInspections");
    this.$store.dispatch("fetchNotifications");
    this.$vuetify.theme.dark =
      localStorage.getItem("dark_mode") === "true" ? true : false;
    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", "demo");
      localStorage.setItem("password", "password");
      localStorage.setItem("twoFactorCode", "2468");
    }
  }
};
</script>