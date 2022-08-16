<template>
  <v-card class="mb-2" elevation="2">
    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="teal">location_on</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ inspection.inspection.location.street }}
            {{ inspection.inspection.location.number }}
            {{ inspection.inspection.location.number_addition }}</v-list-item-title
          >
          <v-list-item-subtitle>
            {{ inspection.inspection.location.zip_code }}
            {{ inspection.inspection.location.city }}</v-list-item-subtitle
          ><v-list-item-subtitle
            ><span class="font-weight-bold">Deadline:</span>
            {{ inspection.inspection.formattedDeadlineDate() }}
          </v-list-item-subtitle>
          <v-list-item-subtitle
            ><span class="font-weight-bold">Executed:</span>
            {{ inspection.inspection.formattedExecutionDate() }}
          </v-list-item-subtitle> </v-list-item-content
        ><v-dialog v-model="inspectionDialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }"
            ><v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="teal lighten-1">edit</v-icon>
            </v-btn></template
          >
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit inspection</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row><v-col cols="12" sm="6" md="4">
                    <v-text-field disabled
                      :value="this.inspection.inspection.formattedDeadlineDate()"
                      label="Deadline date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="street"
                      label="Street*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="number"
                      label="Number*"
                      required
                    ></v-text-field> </v-col
                  ><v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="zip_code"
                      label="Zip code*"
                      required
                    ></v-text-field> </v-col
                  ><v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="city"
                      label="City*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="execution_date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="execution_date"
                          label="Execution date"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
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
                color="blue darken-1"
                text
                @click="inspectionDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveInspection">
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
  data() {
    return {
      inspectionDialog: false,
      modal: false,
      street: this.inspection.inspection.location.street,
      number: this.inspection.inspection.location.number,
      city: this.inspection.inspection.location.city,
      zip_code: this.inspection.inspection.location.zip_code,
      execution_date: this.inspection.inspection.executionDate().toISOString().substr(0, 10)
    };
  },
  methods: {
    saveInspection() {
      console.log(this.inspection)
      this.$store.dispatch('changeInspection', [this.inspection.id, this.street, this.number, this.zip_code, this.city, this.execution_date])
      this.inspectionDialog = false;
    },
  },
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
};
</script>
