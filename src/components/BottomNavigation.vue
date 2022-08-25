<template>
  <v-bottom-navigation dark class="primary">
    <v-btn @click="notify('No action defined yet for Active task')">
      <span>Last </span>
      <v-icon>build</v-icon>
    </v-btn>

    <v-btn @click="notify('No action defined yet for Search')">
      <span>Search knowledge base</span>
      <v-icon>manage_search</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
import mixins from "@/mixins/mixins";
export default {
  name: "BottomNavigation",
  mixins: [mixins],
  methods:{
    notify(text){
      this.$store.dispatch('showSnackbarFailed',[text,3000])
    }
  }
};
</script>