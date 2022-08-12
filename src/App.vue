<template>
  <v-app 
    ><div>
      <TopNavigation v-if="!isLoginView" />
    </div>
    <v-main>
      <router-view />
    </v-main>
    <BottomNavigation v-if="!isLoginView"/>
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
    
  }),
  computed:{
    isLoginView(){
      return this.$route.name === 'login'
    }
  },
  created() {
    this.$store.dispatch('fetchExecutedInspections');
    this.$store.dispatch('fetchAssignedInspections');
    this.$vuetify.theme.dark = localStorage.getItem('dark_mode') === 'true' ? true : false;
  },
};
</script>