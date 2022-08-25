<template>
  <list-inspections
    :inspections="this.$store.state.assigned_inspections"
    toolbarText="Assigned inspections"
  />
</template>

<script>
import ListInspections from "@/components/Lists/ListInspections.vue";
export default {
  components: {
    ListInspections,
  },
};
</script>
