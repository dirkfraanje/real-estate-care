<template>
<v-toolbar class="primary">
      <v-toolbar-title class="ml-2">{{ this.text }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
</template>
<script>
export default {
    props:{
        text:{
            type: String,
            required: true
        }
    }
}
</script>
