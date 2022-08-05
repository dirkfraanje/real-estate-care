<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row  justify="space-around">
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card align="center" class="mt-1" @click="$router.push(card.route)">
                <v-badge v-if="card.badgecontent > 0"
        :content="card.badgecontent"
        class="mt-3"
        color="teal"
        overlap
      ><v-icon size="100">{{ card.icon }}</v-icon>
                </v-badge>
                <v-icon v-if="card.badgecontent === 0" size="100">{{ card.icon }}</v-icon>
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
import DataService from "@/Services/DataService";
export default {
  name: "MainCards",
  mixins: [mixins],
  data: () => ({
    cards: [
      { title: "Assigned", icon: "schedule_send", flex: 6, route: 'inspections/assigned', badgecontent: DataService.data.assigned_inspections.length },
      { title: "Executed", icon: "done_all", flex: 6, route: '/inspections/completed', badgecontent: DataService.data.executed_inspections.length },
      { title: "Knowledge base", icon: "view_list", flex: 6, route: 'knowledge_base', badgecontent: 0 },
      { title: "Settings", icon: "settings", flex: 6, route: 'settings', badgecontent: 0 },
    ],
  }),
};
</script>
