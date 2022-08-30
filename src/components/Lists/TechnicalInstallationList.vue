<template>
  <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>TECHNICAL INSTALLATIONS<v-spacer></v-spacer
        ><v-btn icon @click="newInstallation" ><v-icon color="primary">add</v-icon></v-btn></v-subheader
      >
      <v-list-item
        v-for="(installation, i) in inspection.technical_installations"
        :key="i"
      >
        <v-list-item-icon>
          <v-icon color="primary">settings_input_antenna</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            v-text="installation.reported_malfunctions"
          ></v-list-item-title>
        </v-list-item-content>
        <v-btn icon :to="{ name: 'installationdetail', params: { installation: installation } }"
            ><v-icon color="secondary">edit</v-icon></v-btn
          >
      </v-list-item>
    </v-list>
  </v-card>
</template>


<script>
import Installation from '@/store/Classes/TechnicalInstallation'
export default {
  name: "TechnicalInstallationList",
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
  methods:{
    newInstallation(){
      this.$router.push({name: 'installationdetail', params:{ installation: new Installation(null, this.inspection.id, null)}})
    }
  }
};
</script>