<template>
  <v-card class="mb-2" elevation="2">
    <v-list>
      <v-subheader>DAMAGES</v-subheader>
      <v-list-item v-for="(item, i) in inspection.damages" :key="i"
        ><template>
          <v-list-item-icon>
            <v-icon color="teal">broken_image</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.description"></v-list-item-title>
          </v-list-item-content>
          <v-dialog v-model="damageDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }"
              ><v-btn @click="bindData(item)" icon v-bind="attrs" v-on="on">
                <v-icon color="teal lighten-1">edit</v-icon>
              </v-btn></template
            >
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit damage</span>
              </v-card-title>
              <v-card-text>
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
                        v-model="type"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-switch v-model="newDamage" label="New damage">
                      </v-switch>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-switch
                        v-model="acute_action_required"
                        label="Acute action required"
                      >
                      </v-switch>
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
                          v-model="damageDate"
                          :rules="rules.text"
                          label="Date"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          v-on:click:append="modal = true"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="damageDate" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog[0].save(damageDate)"
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
                <v-btn color="blue darken-1" text @click="damageDialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="saveDamage"
                  :disabled="!damageValid"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>


<script>
import mixins from "@/mixins/mixins";
export default {
  name: "DamagesList",
  mixins: [mixins],
  props: {
    inspection: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modal: false,
      damageDialog: false,
      dialog: false,
      id: '',
      damageDate: new Date(),
      description: "",
      location: "",
      type: "",
      newDamage: false,
      acute_action_required: false,
      rules: {
        text: [(val) => (val || "").length > 0 || "This field is required"],
      },
    };
  },
  methods: {
    bindData(damage) {
      this.damageid = damage.id;
      this.description = damage.description;
      this.location = damage.location;
      this.newDamage = damage.new_damage;
      this.type = damage.type_of_damage;
      this.acute_action_required = damage.acute_action_required;
      this.damageDate = damage.datetime().toISOString().substr(0, 10);
    },
    saveDamage() {
      this.$store
        .dispatch("changeDamageDetails", [this.inspection.id, this.damageid, this.location, this.description, this.newDamage, this.type, this.acute_action_required, this.damageDate])
        .then(
          (response) => {
            console.log(response);
            if (response === true) {
              this.damageDialog = false;
              this.$emit('saved', 'success');
            }
            else{
              this.$emit('saved', 'failed');
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  },
  computed: {
    damageValid() {
      return this.location && this.description && this.type && this.damageDate;
    },
  },
};
</script>