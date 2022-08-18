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
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
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
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
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
                <v-btn color="blue darken-1" text @click="saveDamage" :disabled="!damageValid">
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
export default {
  name: "DamagesList",
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
      date: null,
      description: '',
      location: '',
      rules: {
          text: [val => (val || '').length > 0 || 'This field is required'],
        }
    };
  },
  methods: {
    bindData(damage) {
      this.description = damage.description;
      this.location = damage.location
    },
    saveDamage() {
      alert("Damage saved");
      this.damageDialog = false;
    }
  },
  computed:{
    damageValid(){
      return this.location && this.description
    }
  }
};
</script>