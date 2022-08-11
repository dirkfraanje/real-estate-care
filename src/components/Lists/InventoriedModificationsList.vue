<template>
  <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>NEWLY INVENTORIED MODIFICATIONS</v-subheader>
      <v-list-item
        v-for="(item, i) in inspection.inventoriedModifications"
        :key="i"
      >
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
</template>


<script>
export default {
  name: "InventoriedModificationsList",
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
};
</script>