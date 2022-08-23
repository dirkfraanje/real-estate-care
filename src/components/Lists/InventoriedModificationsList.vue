<template>
    <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader
        >NEWLY INVENTORIED MODIFICATIONS<v-spacer></v-spacer
        ><v-btn icon @click="newModification" ><v-icon color="teal">add</v-icon></v-btn></v-subheader
      >
      <v-list-item v-for="(modification, i) in inventoriedModifications" :key="i"
        ><template>
          <v-list-item-icon>
            <v-icon color="teal">construction</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="modification.description"></v-list-item-title>
          </v-list-item-content>
          <v-btn icon :to="{ name: 'modificationdetail', params: { modification: modification } }"
            ><v-icon color="teal lighten-1">edit</v-icon></v-btn
          >
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>


<script>
import Modification from '@/store/Classes/Modification'
export default {
  name: "InventoriedModificationsList",
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
  computed: {
    inventoriedModifications(){
      return this.inspection.modifications.filter(modification => modification.new)
    }
  },
  methods:{
    newModification(){
      let newModification = new Modification(null, this.inspection.id, null, true);
      newModification.new = true;
      this.$router.push({name: 'modificationdetail', params:{ modification: newModification}})
    }
  }
};
</script>