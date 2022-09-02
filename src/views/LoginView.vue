<template>
  <v-app
    ><v-form>
      <v-container fluid
        ><v-row class="justify-center mt-1 mb-1"> <RealEstateCareLogo /></v-row>
        <v-row class="justify-center">
          <v-col class="red darken-2 text-center" cols="12" sm="12"
            ><span class="white--text"
              >For demo purposes use Username: demo and Password: password</span
            >
          </v-col>
          <v-col cols="10" sm="6">
            <v-text-field
              v-model="username"
              :rules="[rules.required]"
              name="input-10-1"
              label="Username"
              counter
            ></v-text-field>
          </v-col>
          <v-col cols="10" sm="6">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 6 characters"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-dialog v-model="twofactor">
      <template v-slot:activator="{ on, attrs }">
        <v-row class="justify-center">
          <v-btn
            dark
            color="primary"
            @click="twoFactor"
            v-bind="attrs"
            v-on="on"
            >Login </v-btn
          ><v-col
            class="mt-1 red darken-2 text-center"
            v-if="showWarning"
            cols="12"
            sm="12"
            ><span class="white--text font-italic"
              >For this prototype only the combination Username: demo and
              Password: password will work</span
            >
          </v-col></v-row
        >
      </template>
      <v-card>
        <v-card-title><small>
          Enter two-factor code
          </small>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Code"
                  required
                  v-model="twoFactorCode"
                ></v-text-field>
              </v-col> </v-row
            >
             <v-row><v-col><big v-if="showAuthenticatorWarning" class="red--text">Enter a code</big></v-col></v-row>
             <v-row><v-col><small>For demo purposes you can use any code you want.</small></v-col></v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="twofactor = false">
            Close
          </v-btn>
          <v-btn color="secondary" text @click="login"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import RealEstateCareLogo from "@/components/RealEstateCareLogo.vue";

export default {
  name: "LoginView",
  components: {
    RealEstateCareLogo,
  },
  data: () => ({
    twofactor: false,
    showPassword: false,
    password: localStorage.getItem("password"),
    username: localStorage.getItem("username"),
    twoFactorCode: localStorage.getItem("twoFactorCode"),
    showWarning: false,
    showAuthenticatorWarning: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  methods: {
    twoFactor() {
      this.twofactor = true;
    },
    login() {
      console.log("t: "+this.twoFactorCode)
      if (this.username !== "demo" || this.password !== "password")
        this.showWarning = true;
      else if (this.twoFactorCode === '')
        this.showAuthenticatorWarning = true;
      else {
        //Simulate storing login
        localStorage.setItem("username", this.username);
        localStorage.setItem("password", this.password);
        this.$store.dispatch("authenticate");
        this.$router.push("/");
      }
    },
  },
};
</script>
