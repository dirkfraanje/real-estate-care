<template>
  <v-app-bar dense dark height="60">
    <div>
      <v-img
        :src="require('../assets/logo_rec.svg')"
        contain
        height="40"
        width="40"
      />
    </div>
    <v-toolbar-title>
      <div class="pa-2">
        <p class="mb-n2 mt-4 nav-font nav-title">Real Estate Care</p>
        <p class="nav-font nav-sub-title">Caring is in our nature</p>
      </div>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>notifications_none</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon @click="$router.push('settings')">settings</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {};
</script>

<style scoped>
.nav-font {
  font-family: "Agency FB";
  color: #e1e3e3;
}
.nav-title {
  font-size: 1em;
}
.nav-sub-title {
  font-size: 0.6em;
  letter-spacing: 0.07em;
}
</style>