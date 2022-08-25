<template>
  <div>
    <v-card class="mx-auto">
      <v-toolbar color="teal" dark
        ><v-btn @click="$router.go(-1)" icon><v-icon>arrow_back</v-icon></v-btn
        ><v-toolbar-title>Knowledge base</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      items: [
        { header: "Modifications" },
        {
          icon: "swipe_right",
          title: "Accept a modification",
          subtitle: `When you think a modification can be accepted you have to aknowledge the new owner and the client. If they both agree the modification is accepted`,
        },
        { header: 'Damages' },
        { divider: true, inset: true },
        {
          icon: "broken_image",
          title: 'Damage by violence',
          subtitle: `If you observe a damage caused by violence you have to report it to the police`,
        },
      ],
    };
  },
};
</script>