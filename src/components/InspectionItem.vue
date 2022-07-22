<template>
  <v-card class="mx-auto">
          <v-list two-line>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="teal">location_on</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  {{ inspection.inspection.location.street }}
                  {{ inspection.inspection.location.number }}
                  {{
                    inspection.inspection.location.number_addition
                  }}</v-list-item-title
                >
                <v-list-item-subtitle>
                  {{ inspection.inspection.location.zip_code }}
                  {{
                    inspection.inspection.location.city
                  }}</v-list-item-subtitle
                ><v-list-item-subtitle><span class="font-weight-bold">Deadline:</span> 
                  {{ inspection.inspection.deadline_date }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle><span class="font-weight-bold">Executed:</span> 
                  {{ inspection.inspection.execution_date }}
                  </v-list-item-subtitle>
              </v-list-item-content><v-btn
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
</template>
<script>
export default {
  name: "LocationDetails",
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
};
</script>
