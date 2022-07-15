<template>
  <v-app
    ><div>
      <NavbarView />
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavbarView from "@/components/NavbarView.vue";
export default {
  name: "App",
  components: {
    NavbarView,
  },
  data: () => ({
    //
  }),
};
</script>
