<template>
  <v-form class="mb-2" v-model="valid">
    <v-container>
      <v-row class="mt-2" justify="space-around"
        ><v-btn @click="$router.go(-1)"> Cancel </v-btn>
        <v-btn :disabled="!valid" @click="saveMaintenance" color="primary"
          >Save</v-btn
        >
        <div class="text-center">
          <v-dialog v-model="deletedialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                Delete
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h6"> Confirm deletion </v-card-title>

              <v-card-text>
                Are you sure you want to delete this maintenance?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="deletedialog = false">
                  Cancel </v-btn
                ><v-btn color="error" text @click="deleteMaintenance">
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="location"
            label="Location*"
            :rules="rules.textRequired"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="description"
            label="Description*"
            :rules="rules.textRequired"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="deferredMaintenanceType"
            label="Type*"
            v-model="type_of_maintenance"
            :rules="rules.textRequired"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="deferredCostIndication"
            label="Cost indication*"
            v-model="cost_indication"
            :rules="rules.textRequired"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-switch
            v-model="acute_action_required"
            label="Acute action required"
          >
          </v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-file-input
            hide-input
            color="primary"
            prepend-icon="mdi-camera"
            accept="image/png, image/jpg, image/jpeg, image/bmp"
            @change="photoSelected"
          ></v-file-input>
        </v-col>
        <v-col cols="12" sm="6" md="4"
          ><v-img :src="photo" max-width="500" max-height="300" id="im">
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import mixins from "@/mixins/mixins";
export default {
  name: "MaintenanceDetail",
  mixins: [mixins],

  data() {
    return {
      deletedialog: false,
      valid: true,
      photo: null,
      rules: {
        textRequired: [
          (val) => (val || "").length > 0 || "This field is required",
        ],
      },
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    saveMaintenance() {
      this.$store.dispatch("changeMaintenanceDetails", [
        this.inspectionid,
        this.id,
        this.location,
        this.description,
        this.type_of_maintenance,
        this.cost_indication,
        this.acute_action_required,
        this.photo,
      ]);
      this.$router.back();
    },
    deleteMaintenance() {
      this.$store.dispatch("deleteMaintenance", [this.inspectionid, this.id]);
      this.deletedialog = false;
      this.$router.back();
    },
  },
  created() {
    this.inspectionid = this.$route.params.maintenance.inspectionId;
    this.id = this.$route.params.maintenance.id;
    this.location = this.$route.params.maintenance.location;
    this.description = this.$route.params.maintenance.description;
    this.type_of_maintenance =
      this.$route.params.maintenance.type_of_maintenance;
    this.cost_indication = this.$route.params.maintenance.cost_indication;
    this.acute_action_required =
      this.$route.params.maintenance.acute_action_required;
    this.photo = localStorage.getItem(
      `maintenancephoto-${this.inspectionid}-${this.id}`
    );
  },
};
</script>