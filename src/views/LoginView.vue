<template>
  <v-app
    ><v-form>
    <v-container fluid><v-row class="justify-center mt-1 mb-1">
      <RealEstateCareLogo /></v-row>
      <v-row class="justify-center" >
        <v-col class="red darken-2 text-center" 
          cols="12"
          sm="12"
        ><span class="white--text">For demo purposes use login: demo and password: password</span>
        </v-col>
        <v-col
          cols="10"
          sm="6"
        >
          <v-text-field
            v-model="username"
            :rules="[rules.required]"
            name="input-10-1"
            label="Username"
            hint="At least 6 characters"
            counter
          ></v-text-field>
        </v-col>
        <v-col
          cols="10"
          sm="6"
        >
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col> 
      </v-row>
      <v-row class="justify-center"> <v-btn
      dark 
      color="teal"
      @click="login"
    >Login
    </v-btn><v-col class="mt-1 red darken-2 text-center" v-if="showWarning"
          cols="12"
          sm="12"
        ><span class="white--text font-italic">For this prototype only the combination login: demo and password: password will work</span>
        </v-col></v-row>
    </v-container>
  </v-form>
  </v-app>
</template>

<script>
import RealEstateCareLogo from '@/components/RealEstateCareLogo.vue'
export default {
  name: "App",
  components: {
    RealEstateCareLogo
  },
  data: () => ({
    
        show1: false,
        password: 'password',
        username: 'demo',
        showWarning: false,
        rules: {
          required: value => !!value || 'Required.'
        },
  }),
  methods:{
    login(){
      if(this.username !== 'demo' || this.password !== 'password' )
        this.showWarning = true
      else
      { localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        this.$store.dispatch('authenticate');
        this.$router.push('/');
      }
    }
  }
};
</script>
