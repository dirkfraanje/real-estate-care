<template>
  <v-bottom-navigation background-color="teal" dark>

    <v-btn @click="noActionDefinedMessage('Active task')">
      <span>Active task</span>
      <v-icon>build</v-icon>
    </v-btn>

    <v-btn @click="noActionDefinedMessage('Search')">
      <span>Search</span>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn @click="noActionDefinedMessage('Information')">
      <span>Information</span>
      <v-icon>priority_high</v-icon>
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