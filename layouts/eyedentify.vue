<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="black"
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{ application }}</span>
      </v-toolbar-title>
      <v-text-field
        v-model="email"
        flat
        solo
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Enter Email"
        class="hidden-sm-and-down"
        @keyup.enter="
          md5Hash()
          getProfile()
        "
      ></v-text-field>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-lock</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="menuitem in menu"
            :key="menuitem"
            @click="() => {}"
          >
            <v-list-item-title>{{ menuitem.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <span>Name: </span>
          <span v-if="Profile" color="black">{{
            Profile.entry[0].name.formatted
          }}</span>
          <span v-if="Profile" color="black">{{ Profile.entry[0].email }}</span>
        </v-row>
      </v-container>
    </v-content>
    <v-btn bottom light fab fixed right @click="snackbar = true">
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
    <v-snackbar v-model="snackbar" bottom :timeout="5000">
      {{ save_all_coming_soon }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import md5 from 'md5'
import { GravatarApi } from '../common/GravatarApi'

export default {
  props: {
    source: String
  },
  data: () => ({
    application: 'Eyedentify',
    snackbar: false,
    Profile: null,
    email: '',
    emailMd5Hash: '',
    save_all_coming_soon: 'Save All Coming Soon...',
    menu: [{ icon: 'settings', text: 'Settings' }]
  }),
  methods: {
    md5Hash() {
      this.emailMd5Hash = md5(this.email)
    },
    getProfile() {
      GravatarApi.get(this.emailMd5Hash.concat('.json'))
        .then((response) => {
          this.Profile = response.data
        })
        .catch((e) => {
          this.errors.push(e)
        })
    }
  }
}
</script>
