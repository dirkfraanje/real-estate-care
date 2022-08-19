<template>
  <v-form
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
        <!-- <v-col cols="12" sm="6" md="4">
          <v-file-input prepend-icon="mdi-camera" accept="image/png, image/jpg, image/jpeg, image/bmp" v-model="photo"></v-file-input>
        </v-col> -->
      </v-row>
      <v-btn @click="saveDamage">Save</v-btn>
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
      photo: "",
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
          this.date
        ])
        .then(
          (response) => {
            console.log(response);
            if (response === true) this.$emit("saved", "success");
            else this.$emit("saved", "failed");
            this.damageDialog = false;
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
  created() {
    this.inspectionid = this.$route.params.damage.inspectionId;
    this.id = this.$route.params.damage.id;
    this.location = this.$route.params.damage.location;
    this.description = this.$route.params.damage.description;
    this.type_of_damage = this.$route.params.damage.type_of_damage;
    this.new_damage = this.$route.params.damage.new_damage;
    this.acute_action_required = this.$route.params.damage.acute_action_required;
    this.date = this.$route.params.damage.damageDate;
  },
  computed: {
    damageValid() {
      return this.location && this.description && this.type && this.damageDate;
    },
  },
};
</script>