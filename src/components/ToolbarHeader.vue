<template>
<v-toolbar dark class="primary">
    <v-btn @click="$router.go(-1)" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>{{ this.text }}</v-toolbar-title>
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
