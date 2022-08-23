<template>
    <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader
        >DOCUMENTED MODIFICATIONS<v-spacer></v-spacer
        ><v-btn icon @click="newModification" ><v-icon color="teal">add</v-icon></v-btn></v-subheader
      >
      <v-list-item v-for="(modification, i) in documentedModifications" :key="i"
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
  name: "DocumentedModificationsList",
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
  computed: {
    documentedModifications(){
      return this.inspection.modifications.filter(modification => !modification.new)
    }
  },
  methods:{
    newModification(){
      this.$router.push({name: 'modificationdetail', params:{ modification: new Modification(null, this.inspection.id, null)}})
    }
  }
};
</script>