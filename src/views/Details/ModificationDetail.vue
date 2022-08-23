<template>
  <v-form class="mb-2" v-model="valid">
    <v-container>
      <v-row class="mt-2" justify="space-around"
        ><v-btn @click="$router.go(-1)"> Cancel </v-btn>
        <v-btn :disabled="!valid" @click="saveModification" color="primary"
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
                Are you sure you want to delete this modification?
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="deletedialog = false">
                  Cancel </v-btn
                ><v-btn color="error" text @click="deleteModification">
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
            :items="modificationPerformedBy"
            label="Performed by*"
            v-model="performed_by"
            :rules="rules.textRequired"
            required
          ></v-select>
        </v-col>
         <v-col cols="12" sm="6" md="4">
          <v-select
            :items="modificationAction"
            label="Action to take*"
            v-model="action_to_take"
            :rules="rules.textRequired"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="remarks"
            label="Remarks"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-file-input
            hide-input
            color="teal"
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
  name: "DamageDetail",
  mixins: [mixins],
  data() {
    return {
      deletedialog: false,
      valid: true,
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
    validate() {
      this.$refs.form.validate();
    },
    saveModification() {
      this.$store
        .dispatch("changeModificationDetails", [
          this.inspectionid,
          this.id,
          this.location,
          this.performed_by,
          this.description,
          this.action_to_take,
          this.remarks,
          this.photo    
        ]);
      this.$router.back();
    },
    deleteModification() {
      this.$store.dispatch("deleteModification", [this.inspectionid, this.id]);
      this.deletedialog = false;
      this.$router.back();
    },
  },
  created() {
    this.inspectionid = this.$route.params.modification.inspectionId;
    this.id = this.$route.params.modification.id;
    this.location = this.$route.params.modification.location;
    this.performed_by = this.$route.params.modification.performed_by;
    this.description = this.$route.params.modification.description;
    this.action_to_take = this.$route.params.modification.action_to_take;
    this.remarks = this.$route.params.modification.remarks;
    this.photo = localStorage.getItem(
      `modificationphoto-${this.inspectionid}-${this.id}`
    );
  },
};
</script>