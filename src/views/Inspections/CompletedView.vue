<template>
  <list-inspections
    :inspections="this.$store.state.executed_inspections"
    toolbarText="Executed inspections"
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
