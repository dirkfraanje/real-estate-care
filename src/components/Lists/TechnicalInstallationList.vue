<template>
  <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>TECHNICAL INSTALLATIONS</v-subheader>
      <v-list-item
        v-for="(item, i) in inspection.technical_installations"
        :key="i"
      >
        <v-list-item-icon>
          <v-icon color="teal">settings_input_antenna</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            v-text="item.reported_malfunctions"
          ></v-list-item-title>
        </v-list-item-content>
        <v-btn
          icon
          @click="
            $router.push({
              name: 'TechnicalInstallationEdit',
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
  name: "TechnicalInstallations",
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
};
</script>