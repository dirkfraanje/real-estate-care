<template>
  <v-bottom-navigation dark class="primary">

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