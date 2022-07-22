<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card align="center" class="mt-1" @click="$router.push(card.route)">
            <v-icon size="100">{{ card.icon }}</v-icon>
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
      { title: "Scheduled", icon: "schedule_send", flex: 6, route: 'scheduled' },
      { title: "Executed", icon: "done_all", flex: 6, route: '/inspections/completed' },
      { title: "Knowledge base", icon: "view_list", flex: 6, route: 'knowledge_base' },
      { title: "Settings", icon: "settings", flex: 6, route: 'settings' },
    ],
  }),
};
</script>
