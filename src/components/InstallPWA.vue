<!-- PWAPrompt.vue -->
<template>
  <v-container class="grey lighten-5">
    Add app to home screen?

    <v-btn @click="installPWA">
      Install!
    </v-btn>

    <v-btn @click="dismissPrompt">
      No, thanks
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    shown: false,
  }),

  beforeMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.installEvent = e
      this.shown = true
    })
  },

  methods: {
    dismissPrompt() {
      this.shown = false
    },

    installPWA() {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt() // Hide the prompt once the user's clicked
        if (choice.outcome === 'accepted') {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      })
    },
  }
}
</script>