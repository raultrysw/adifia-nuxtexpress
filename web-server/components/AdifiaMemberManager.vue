<template>
  <tr>
        <td>{{member.name}} {{member.surname}}</td>
        <td>{{member.email}}</td>
        <td>
            <select :value="member.pvLvl" @change="updateLvl">
                <option v-for="(rol, index) in rols" :value="index" :key="index">{{rol}}</option>
            </select>
        </td>
    </tr>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

const {ROLS} = require('../../settings') 

export default {
    data() {
        return {
            rols: ROLS
        }
    },
  props: ['member'],
  computed: {
      rol() {
          return ROLS[this.member.pvLvl]
      },
        MEMBERS_API_URL() {
            return '/members/' + this.member._id
        },
      ...mapGetters(['headers'])
  },
  methods: {
      updateLvl(e) {
          let lvl = e.target.value
          this.$http.put(this.MEMBERS_API_URL, {pvLvl: lvl}, {headers: this.headers}).then(response => {
              if (response.data.status === 'ok') {
                  this.member.pvLvl = lvl;
              }
          })
      }
  }
}
</script>
