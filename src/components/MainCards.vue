<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row justify="space-around">
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card align="center" class="mt-1" @click="$router.push(card.route)">
            <v-badge v-if="card.badgecontent !== ''"
        :content="card.badgecontent === 'executed_count' ? executed_count : assigned_count"
        class="mt-3"
        color="teal"
        overlap
      ><v-icon size="100">{{ card.icon }}</v-icon>
                </v-badge><v-icon v-if="card.badgecontent === ''" size="100">{{ card.icon }}</v-icon>
            <v-list-item-content
              v-text="card.title"
              class="justify-center text-overline"
            ></v-list-item-content>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import mixins from "@/mixins/mixins";
export default {
  name: "MainCards",
  mixins: [mixins],
  data: () => ({
    cards: [
      {
        title: "Assigned",
        icon: "schedule_send",
        flex: 6,
        route: "inspections/assigned", badgecontent: 'executed_count'
      },
      {
        title: "Executed",
        icon: "done_all",
        flex: 6,
        route: "/inspections/completed", badgecontent: 'assigned_count'
      },
      {
        title: "Knowledge base",
        icon: "view_list",
        flex: 6,
        route: "knowledge_base", badgecontent: ''
      },
      { title: "Settings", icon: "settings", flex: 6, route: "settings", badgecontent: '' },
    ],
  }),
  computed:{
    executed_count(){
      return this.$store.state.executed_count
    },
    assigned_count(){
      return this.$store.state.assigned_count
    }
  }
};
</script>
