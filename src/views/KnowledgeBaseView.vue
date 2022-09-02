<template>
  <div>
    <v-card class="mx-auto">
       <ToolbarHeader text="Knowledge base" />
      <v-autocomplete
        autofocus
        v-model="select"
        :loading="loading"
        :search-input.sync="search"
        append-icon=""
        class="mx-2 mt-2"
        flat
        hide-no-data
        hide-details
        label="Search knowledge base content"
      ></v-autocomplete>
      <v-list three-line>
        <template v-for="(article, index) in items">
          <v-subheader
            v-if="article.header"
            :key="article.header"
            v-text="article.header"
          ></v-subheader>

          <v-divider
            v-else-if="article.divider"
            :key="index"
            :inset="article.inset"
          ></v-divider>

          <v-list-item @click="showArticleDetails(article)" v-else :key="article.title">
            <v-list-item-avatar>
              <v-icon>{{ article.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="article.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="article.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-dialog
      v-model="articleDialog"
      width="500"
    >


      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ article_title }}
        </v-card-title>

        <v-card-text>
          {{ article_subtitle }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="articleDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-card>
  </div>
</template>
<script>
import ToolbarHeader from "@/components/ToolbarHeader.vue"
export default {
  components: {
    ToolbarHeader
  },
  data() {
    return {
      articleDialog: false,
      article_title: '',
      article_subtitle: '',
      loading: false,
      items: [],
      search: null,
      select: null,
      knowledgebase: [
        { header: "Modifications" },
        {
          icon: "swipe_right",
          title: "Accept a modification",
          subtitle: `When you think a modification can be accepted you have to aknowledge the new owner and the client. If they both agree the modification is accepted`,
        },
        {
          icon: "policy",
          title: "Have a modification inspected",
          subtitle:
            "If you want a modification to be inspected, enter the details why in the remarks field",
        },
        {
          icon: "block",
          title: "Remove a modification",
          subtitle:
            "If you want a modification to be removed, explain the reason why in the remarks field",
        },
        {
          icon: "assignment_turned_in",
          title: "Have a modification adjusted and aproved",
          subtitle:
            "If a modification needs to be adjusted, enter the Performed by field",
        },
        { header: "Damages" },
        { divider: true, inset: true },
        {
          icon: "broken_image",
          title: "Damage by violence",
          subtitle: `If you observe a damage caused by violence you have to report it to the police`,
        },
      ],
    };
  },
  watch:{
    search (val) {
        val && val !== this.select && this.querySelections(val)
      }
  },
    methods: {
      showArticleDetails(article){
        this.article_title = article.title
        this.article_subtitle = article.subtitle
        this.articleDialog = true;
      },
      querySelections (v) {
        this.loading = true
        setTimeout(() => {
        
          this.items = this.knowledgebase.filter(e => {
             
             return (e.subtitle || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
           
          })
          this.loading = false
        }, 500)
      },
    },
    created(){
      this.items = this.knowledgebase
    }
};
</script>