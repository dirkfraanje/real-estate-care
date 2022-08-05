<template>
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
                name: 'DamageEdit',
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
  name: "DamagesList",
  props: {
    inspection: {
      type: Object,
      required: true,
    }
  },
};
</script>