<template>
  <v-card class="mx-auto">
    <ToolbarHeader text="Knowledge base" />
  </v-card>
</template>
<script>
import ToolbarHeader from "@/components/ToolbarHeader.vue";
export default {
  components: {
    ToolbarHeader,
  },
  data() {
    return {
      settings: [],
    };
  },
};
</script>