<template>
  <v-form class="mb-2" v-model="valid">
    <v-container>
      <v-row class="mt-2" justify="space-around"
        ><v-btn @click="$router.go(-1)"> Cancel </v-btn>
        <v-btn :disabled="!valid" @click="saveInstallation" color="primary"
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
                Are you sure you want to delete this installation?
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="deletedialog = false">
                  Cancel </v-btn
                ><v-btn color="error" text @click="deleteInstallation">
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
          <v-select
            :items="technicalInstallationType"
            label="Type*"
            v-model="installation_type"
            :rules="rules.textRequired"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="reported_malfunctions"
            label="Reported malfunctions*"
            :rules="rules.textRequired"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="test_procedure"
            label="Test procedure"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-switch v-model="approved" label="Approved"> </v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="remarks"
            label="Remarks"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import mixins from "@/mixins/mixins";
export default {
  name: "InstallationDetail",
  mixins: [mixins],

  data() {
    return {
      deletedialog: false,
      valid: true,
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
    saveInstallation() {
      this.$store.dispatch("changeInstallationDetails", [
        this.inspectionid,
        this.id,
        this.location,
        this.installation_type,
        this.reported_malfunctions,
        this.test_procedure,
        this.approved,
        this.remarks,
      ]);
      this.$router.back();
    },
    deleteInstallation() {
      this.$store.dispatch("deleteTechnicalInstallation", [this.inspectionid, this.id]);
      this.deletedialog = false;
      this.$router.back();
    },
  },
  created() {
    this.inspectionid = this.$route.params.installation.inspectionId;
    this.id = this.$route.params.installation.id;
    this.location = this.$route.params.installation.location;
    this.installation_type = this.$route.params.installation.installation_type;
    this.reported_malfunctions =
      this.$route.params.installation.reported_malfunctions;
    this.test_procedure = this.$route.params.installation.test_procedure;
    this.approved = this.$route.params.installation.approved;
    this.remarks = this.$route.params.installation.remarks;
  },
};
</script>