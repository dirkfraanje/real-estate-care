<template>
<v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>DEFERRED MAINTENANCE<v-spacer></v-spacer
        ><v-btn icon @click="newDeferredMaintenance" ><v-icon color="teal">add</v-icon></v-btn></v-subheader
      >
        <v-list-item
          v-for="(maintenance, i) in inspection.deferred_maintenance"
          :key="i">
          <v-list-item-icon>
            <v-icon color="teal">engineering</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="maintenance.description"></v-list-item-title>
          </v-list-item-content>
          <v-btn icon :to="{ name: 'maintenancedetail', params: { maintenance: maintenance } }"
            ><v-icon color="teal lighten-1">edit</v-icon></v-btn
          >
        </v-list-item>
    </v-list>
          </v-card>
</template>


<script>
import Maintenance from '@/store/Classes/DeferedMaintenance'
export default {
  name: "DeferedMaintenanceList",
  props: {
    inspection: {
      type: Object,
      required: true,
    }
  },
  methods:{
    newDeferredMaintenance(){
      this.$router.push({name: 'maintenancedetail', params:{ damage: new Maintenance(null, this.inspection.id, null)}})
    }
  }
};
</script>