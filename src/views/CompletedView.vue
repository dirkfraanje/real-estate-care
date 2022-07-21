<template>
  <div class="about">
    <h1>Executed inspections</h1>
    <v-list>
      <v-list-item v-for="(inspection, i) in inspections" :key="i">
        <v-list-item-icon><v-list-item-icon>
            <v-icon v-text="inspection.inspection.icon"></v-icon>
          </v-list-item-icon>
          </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ inspection.inspection.location.street }} {{ inspection.inspection.location.number }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  data(){
    return {
      inspections:[]
    }
  },
  mounted(){
    fetch('http://localhost:3000/inspections')
    .then(res => res.json())
    .then(data => this.inspections = data)
    .catch(err => alert(err.message))
  }
}
</script>
