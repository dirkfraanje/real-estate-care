import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: colors.teal,
          secondary: colors.teal.darken1,
          accent: colors.teal.darken3
        
        },
        dark: {
          primary: colors.teal,
          secondary: colors.teal.lighten2,
          accent: colors.teal.lighten3
        },
      },
    },
  });
