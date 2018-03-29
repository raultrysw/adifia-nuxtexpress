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

const MEMBERS_URI = 'http://localhost:7000/api/members/'

export default {
    components: {AdifiaMemberManager},
    data() {
        return {
            members: []
        }
    },
  mounted() {
      axios.get(MEMBERS_URI).then(response => {
          const {users} = response.data
          this.members = users
          console.log('usuarios',users);
          
      })
  }
}
</script>
