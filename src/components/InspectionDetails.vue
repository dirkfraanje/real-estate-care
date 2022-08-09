<template>
  <v-card class="mb-2" elevation="2">
    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="teal">location_on</v-icon>
        </v-list-item-icon>
        <img :src="`data:image/png;base64,${inspection.details.photo}`" />
        <v-list-item-content>
          <v-list-item-title>
            {{ inspection.location.street }}
            {{ inspection.location.number }}
            {{ inspection.location.number_addition }}</v-list-item-title
          >
          <v-list-item-subtitle>
            {{ inspection.location.zip_code }}
            {{ inspection.location.city }}</v-list-item-subtitle
          ><v-list-item-subtitle
            ><span class="font-weight-bold">Deadline:</span>
            {{ inspection.details.formattedDeadlineDate() }}
          </v-list-item-subtitle>
          <v-list-item-subtitle
            ><span class="font-weight-bold">Executed:</span>
            {{ inspection.details.formattedExecutionDate() }}
          </v-list-item-subtitle> </v-list-item-content
        ><v-btn
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
  name: "InspectionDetails",
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
};
</script>
