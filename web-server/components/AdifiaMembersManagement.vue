<template>
  <table>
      <thead>
          <th>Nombre del usuario y apellidos</th>
          <th>Correo electrónico</th>
          <th>Nivel de permisos</th>
      </thead>
      <tbody>
          <tr v-for="(member, index) in members" :key="index" is="adifia-member-manager" :member="member"></tr>
      </tbody>
  </table>
</template>
<script>
import axios from 'axios'

import AdifiaMemberManager from '~/components/AdifiaMemberManager.vue'

const MEMBERS_URI = '/members/'

export default {
    components: {AdifiaMemberManager},
    data() {
        return {
            members: []
        }
    },
  mounted() {
      this.makeRequest({url: MEMBERS_URI}, 'get',
        ({users}) => {
            this.members = users
        },
        ({errors}) => {
            console.log(errors)
        }
      )
  }
}
</script>
