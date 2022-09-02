<template>
  <v-card class="mb-2" elevation="2">
    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">location_on</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ inspection.inspection.location.street }}
            {{ inspection.inspection.location.number }}
            {{
              inspection.inspection.location.number_addition
            }}</v-list-item-title
          >
          <v-list-item-subtitle>
            {{ inspection.inspection.location.zip_code }}
            {{ inspection.inspection.location.city }}</v-list-item-subtitle
          ><v-list-item-subtitle
            ><span class="font-weight-bold">Deadline:</span>
            {{ inspection.inspection.deadline_date }}
          </v-list-item-subtitle>
          <v-list-item-subtitle
            ><span class="font-weight-bold">Executed:</span>
            {{ inspection.inspection.execution_date }}
          </v-list-item-subtitle> </v-list-item-content
        ><v-dialog v-model="inspectionDialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }"
            ><v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="secondary">edit</v-icon>
            </v-btn></template
          >
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit inspection</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row
                  ><v-col cols="12" sm="6" md="4">
                    <v-text-field
                      disabled
                      :value="this.inspection.inspection.deadline_date"
                      label="Deadline date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="street"
                      label="Street*"
                      :rules="rules.text"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      type="number"
                      v-model="number"
                      label="Number*"
                      :rules="rules.number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="number_addition"
                      label="Number addition"
                    ></v-text-field> </v-col
                  ><v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="zip_code"
                      label="Zip code*"
                      :rules="rules.text"
                      required
                    ></v-text-field> </v-col
                  ><v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="city"
                      label="City*"
                      :rules="rules.text"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="execution_date"
                          label="Execution date"
                          prepend-icon="clear"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          v-on:click:prepend="removeDate"
                          v-on:click:append="modal = true"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="execution_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(execution_date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-container>
              <small>*required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="secondary"
                text
                @click="inspectionDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                :disabled="!inspectionValid"
                color="secondary"
                text
                @click="saveInspection"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: "InspectionDetails",
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      initialExecutionDate: this.inspection.inspection.execution_date,
      inspectionDialog: false,
      modal: false,
      street: this.inspection.inspection.location.street,
      number: this.inspection.inspection.location.number,
      number_addition: this.inspection.inspection.location.number_addition,
      city: this.inspection.inspection.location.city,
      zip_code: this.inspection.inspection.location.zip_code,
      execution_date: this.inspection.inspection.execution_date,
      rules: {
        text: [(val) => (val || "").length > 0 || "This field is required"],
        number: [(val) => val > 0 || "This field is required"]
      },
    };
  },
  methods: {
    saveInspection() {
      this.$store
        .dispatch("changeInspectionDetails", [
          this.inspection.id,
          this.street,
          this.number,
          this.number_addition,
          this.zip_code,
          this.city,
          this.execution_date,
        ])
        .then((response) => {
          if (response === true) {
            if (!this.initialExecutionDate && this.execution_date)
              this.$router.push("completed");
            this.inspectionDialog = false;
          }
        });
    },
    removeDate(){
      this.execution_date = ''
    }
  },
  computed: {
    inspectionValid() {
      return this.street && this.number && this.number > 0 && this.zip_code && this.city;
    },
  },
};
</script>
