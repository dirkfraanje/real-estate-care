<template>
  <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>DAMAGES</v-subheader>
      <v-list-item v-for="(damage, i) in inspection.damages" :key="i"
        ><template>
          <v-list-item-icon>
            <v-icon color="teal">broken_image</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="damage.description"></v-list-item-title>
          </v-list-item-content> <v-btn icon :to="{ name: 'damagedetail', params:{damage: damage} }"><v-icon color="teal lighten-1">edit</v-icon></v-btn>
        </template>
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
    },
  }
};
</script>