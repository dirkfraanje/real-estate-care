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
import DataService from "@/Services/DataService";
export default {
  name: "App",
  components: {
    TopNavigation,
    BottomNavigation,
  },
  data: () => ({
    //
  }),
  mounted() {
    DataService.methods.fetchExecutedInspections();
    DataService.methods.fetchAssignedInspections();
  },
};
</script>
