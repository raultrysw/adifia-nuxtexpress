<template lang="html">
  <v-card>
    <v-card-title>
      <h1 class="subheading">Bienvenido {{user.name}} {{user.surname}}</h1>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <h1 class="body-2">Acciones del usuario</h1>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-title>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="css">
</style>
