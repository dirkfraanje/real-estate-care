<template>
  <div>
    <h3 class="pl-10">Executed inspections</h3>
    <div><v-expansion-panels>
      <v-expansion-panel v-for="(inspection, i) in this.$store.state.executed_inspections" :key="i">
        <v-expansion-panel-header class="ml-4"
          ><div>
            <v-icon color="teal lighten-1">{{
              inspection.details.icon
            }}</v-icon>
            {{ inspection.location.street }}
            {{ inspection.location.number }}
            {{ inspection.location.number_addition }},
            {{ inspection.location.city }}
          </div></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <InspectionDetails :inspection="inspection" />
          <DamagesList :inspection="inspection" />
          <DeferedMaintenanceList :inspection="inspection" />
          <TechnicalInstallationList :inspection="inspection" />
          <DocumentedModificationsList :inspection="inspection" />
          <InventoriedModificationsList :inspection="inspection" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels></div>
  </div>
</template>
<script>
import InspectionDetails from "@/components/InspectionDetails.vue";
import DamagesList from "@/components/Lists/DamagesList.vue";
import DeferedMaintenanceList from "@/components/Lists/DeferedMaintenanceList.vue";
import TechnicalInstallationList from "@/components/Lists/TechnicalInstallationList.vue";
import DocumentedModificationsList from "@/components/Lists/DocumentedModificationsList.vue";
import InventoriedModificationsList from "@/components/Lists/InventoriedModificationsList.vue";

export default {
  components: {
    InspectionDetails,
    DamagesList,
    DeferedMaintenanceList,
    TechnicalInstallationList,
    DocumentedModificationsList,
    InventoriedModificationsList
  }
};
</script>
