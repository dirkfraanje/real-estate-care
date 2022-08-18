<template>
  <v-card class="mx-auto"
    ><v-snackbar
      v-model="snackbar"
      :timeout="2500"
      top
      elevation="20"
      rounded
      class="ml-5"
      :color="snackbarcolor"
    >
      <h3 class="ml-2">{{ snackbartext }}</h3>
    </v-snackbar>
    <ToolbarHeader text="Executed inspections" />
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(inspection, i) in this.$store.state.executed_inspections"
        :key="i"
      >
        <v-expansion-panel-header class="ml-4"
          ><div>
            <v-icon color="teal lighten-1">{{
              inspection.inspection.icon
            }}</v-icon>
            {{ inspection.inspection.location.street }}
            {{ inspection.inspection.location.number }}
            {{ inspection.inspection.location.number_addition }},
            {{ inspection.inspection.location.city }}
          </div></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <InspectionDetails
            :inspection="inspection"
            @saved="saved"
          />
          <DamagesList :inspection="inspection" @saved="saved"/>
          <DeferedMaintenanceList :inspection="inspection" />
          <TechnicalInstallationList :inspection="inspection" />
          <DocumentedModificationsList :inspection="inspection" />
          <InventoriedModificationsList :inspection="inspection" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script>
import InspectionDetails from "@/components/InspectionDetails.vue";
import DamagesList from "@/components/Lists/DamagesList.vue";
import DeferedMaintenanceList from "@/components/Lists/DeferedMaintenanceList.vue";
import TechnicalInstallationList from "@/components/Lists/TechnicalInstallationList.vue";
import DocumentedModificationsList from "@/components/Lists/DocumentedModificationsList.vue";
import InventoriedModificationsList from "@/components/Lists/InventoriedModificationsList.vue";
import ToolbarHeader from "@/components/ToolbarHeader.vue";
export default {
  data() {
    return {
      snackbar: false,
      snackbartext: '',
      snackbarcolor: 'teal accent-4'
    };
  },
  components: {
    InspectionDetails,
    DamagesList,
    DeferedMaintenanceList,
    TechnicalInstallationList,
    DocumentedModificationsList,
    InventoriedModificationsList,
    ToolbarHeader,
  },
  methods:{
    saved(message){
      if(message === 'success'){
        this.snackbartext = 'Saved..'
        this.snackbarcolor = 'teal accent-4';
      }else{
        this.snackbarcolor = 'orange accent-4';
        this.snackbartext = 'Save failed..'
      }
      this.snackbar = true;
      
    }
  }
};
</script>
