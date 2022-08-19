<template>
  <v-form class="mb-2"
    ><ToolbarHeader text="Edit damage" />
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="location"
            label="Location*"
            :rules="rules.text"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="description"
            label="Description*"
            :rules="rules.text"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="damageType"
            label="Type"
            v-model="type_of_damage"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-switch v-model="new_damage" label="New damage"> </v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-switch
            v-model="acute_action_required"
            label="Acute action required"
          >
          </v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-dialog ref="dialog" v-model="modal" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                :rules="rules.text"
                label="Date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                v-on:click:append="modal = true"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-file-input
            prepend-icon="mdi-camera"
            accept="image/png, image/jpg, image/jpeg, image/bmp"
            @change="photoSelected"
          ></v-file-input>
        </v-col>
        <v-col cols="12" sm="6" md="4"
          ><v-img :src="photo" max-width="500" max-height="300" id="im">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-btn @click="$router.go(-1)"> Cancel </v-btn>
        <v-btn @click="saveDamage" color="primary">Save</v-btn></v-row
      >
    </v-container>
  </v-form>
</template>

<script>
import ToolbarHeader from "@/components/ToolbarHeader.vue";
import mixins from "@/mixins/mixins";
export default {
  name: "DamageDetail",
  mixins: [mixins],
  components: {
    ToolbarHeader,
  },
  data() {
    return {
      modal: false,
      photo: null,
      rules: {
        textRequired: [
          (val) => (val || "").length > 0 || "This field is required",
        ],
      },
    };
  },
  methods: {
    saveDamage() {
      this.$store
        .dispatch("changeDamageDetails", [
          this.inspectionid,
          this.id,
          this.location,
          this.description,
          this.new_damage,
          this.type_of_damage,
          this.acute_action_required,
          this.date,
          this.photo,
        ])
        .then(
          (response) => {
            console.log(response);
            if (response === true) this.$emit("saved", "success");
            else this.$emit("saved", "failed");
          },
          (error) => {
            console.log(error);
          }
        );
      this.$router.back();
    },
    photoSelected(event) {
      if (!event) return;
      const reader = new FileReader();
      reader.readAsDataURL(event);
      reader.onload = () => {
        const imgElement = document.createElement("img");
        imgElement.src = reader.result;

        imgElement.onload = (e) => {
          const canvas = document.createElement("canvas");
          const MAX = 300;
          const scale = MAX / e.target.width;
          canvas.width = MAX;
          canvas.height = e.target.height * scale;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
          this.photo = ctx.canvas.toDataURL(e.target.result)
        };
      };
    },
  },
  created() {
    this.inspectionid = this.$route.params.damage.inspectionId;
    this.id = this.$route.params.damage.id;
    this.location = this.$route.params.damage.location;
    this.description = this.$route.params.damage.description;
    this.type_of_damage = this.$route.params.damage.type_of_damage;
    this.new_damage = this.$route.params.damage.new_damage;
    this.acute_action_required =
      this.$route.params.damage.acute_action_required;
    this.date = this.$route.params.damage.date;
    this.photo = localStorage.getItem(
      `damagephoto-${this.inspectionid}-${this.id}`
    );
  },
  computed: {
    damageValid() {
      return this.location && this.description && this.type && this.damageDate;
    },
  },
};
</script>