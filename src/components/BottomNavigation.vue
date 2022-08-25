<template>
  <v-bottom-navigation dark class="primary">

    <v-btn @click="noActionDefinedMessage('Active task')">
      <span>Active task</span>
      <v-icon>build</v-icon>
    </v-btn>

    <v-btn @click="noActionDefinedMessage('Search')">
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
};
</script>