<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(inspection, i) in inspections" :key="i">
      <v-expansion-panel-header class="ml-4"><div><v-icon color="teal lighten-1">{{inspection.inspection.icon}}</v-icon>
          {{ inspection.inspection.location.street }}
          {{ inspection.inspection.location.number }}
          {{ inspection.inspection.location.number_addition }}, {{ inspection.inspection.location.city}}
       </div></v-expansion-panel-header>
      <v-expansion-panel-content>
        <InspectionDetails :inspection="inspection"/>
          <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>DAMAGES</v-subheader>
        <v-list-item
          v-for="(item, i) in inspection.damages"
          :key="i">
          <v-list-item-icon>
            <v-icon color="teal">broken_image</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.description"></v-list-item-title>
          </v-list-item-content>
          <v-btn
            icon
            @click="
              $router.push({
                name: 'InspectionEdit',
                params: { id: inspection.inspection.id },
              })
            "
          >
            <v-icon color="teal lighten-1">edit</v-icon>
          </v-btn>
        </v-list-item>
    </v-list>
          </v-card>
    <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>DEFERRED MAINTENANCE</v-subheader>
        <v-list-item
          v-for="(item, i) in inspection.deferred_maintenance"
          :key="i">
          <v-list-item-icon>
            <v-icon color="teal">engineering</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.description"></v-list-item-title>
          </v-list-item-content>
          <v-btn
            icon
            @click="
              $router.push({
                name: 'InspectionEdit',
                params: { id: inspection.inspection.id },
              })
            "
          >
            <v-icon color="teal lighten-1">edit</v-icon>
          </v-btn>
        </v-list-item>
    </v-list>
          </v-card>
    <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>TECHNICAL INSTALLATIONS</v-subheader>
        <v-list-item
          v-for="(item, i) in inspection.technical_installations"
          :key="i">
          <v-list-item-icon>
            <v-icon color="teal">settings_input_antenna</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.reported_malfunctions"></v-list-item-title>
          </v-list-item-content>
          <v-btn
            icon
            @click="
              $router.push({
                name: 'InspectionEdit',
                params: { id: inspection.inspection.id },
              })
            "
          >
            <v-icon color="teal lighten-1">edit</v-icon>
          </v-btn>
        </v-list-item>
    </v-list>
          </v-card>
    <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>ALREADY DOCUMENTED MODIFICATIONS</v-subheader>
        <v-list-item
          v-for="(item, i) in inspection.modifications.already_documented_modifications"
          :key="i">
          <v-list-item-icon>
            <v-icon color="teal">construction</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.description"></v-list-item-title>
          </v-list-item-content>
          <v-btn
            icon
            @click="
              $router.push({
                name: 'InspectionEdit',
                params: { id: inspection.inspection.id },
              })
            "
          >
            <v-icon color="teal lighten-1">edit</v-icon>
          </v-btn>
        </v-list-item>
    </v-list>
          </v-card>
    <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>NEWLY INVENTORIED MODIFICATIONS</v-subheader>
        <v-list-item
          v-for="(item, i) in inspection.modifications.newly_inventoried_modifications_during_inspection"
          :key="i">
          <v-list-item-icon>
            <v-icon color="teal">handyman</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.description"></v-list-item-title>
          </v-list-item-content>
          <v-btn
            icon
            @click="
              $router.push({
                name: 'InspectionEdit',
                params: { id: inspection.inspection.id },
              })
            "
          >
            <v-icon color="teal lighten-1">edit</v-icon>
          </v-btn>
        </v-list-item>
    </v-list>
  </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import InspectionDetails from '@/components/InspectionDetails.vue';
export default {
  components:{
 InspectionDetails
  },
 
  data() {
    return {
      inspections: [],
    };
  },
  mounted() {
    fetch("http://localhost:3000/inspections")
      .then((res) => res.json())
      .then((data) => (this.inspections = data))
      .catch((err) => alert(err.message));
  },
};
</script>
