<template>
  <v-app
    ><div>
      <TopNavigation />
    </div>
    <v-main>
      <router-view />
    </v-main>
    <BottomNavigation />
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
  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('fetchExecutedInspections');
    this.$store.dispatch('fetchAssignedInspections');
  },
};
</script>
