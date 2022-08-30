import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#00aaa2',
          secondary: '#01847e',
          accent: '#00706b'
        
        },
        dark: {
          primary: '#008983',
          secondary: '#029d96',
          accent: '#01bdb4'
        },
      },
    },
  });
