<template>
  <header>
      <rsw-toggle-input v-if="mqIs('-l')" v-model="toggled" text="mostrar aside">
        <font-awesome-icon icon="bars" />
      </rsw-toggle-input>
      <h1>Adifia <span v-if="mqIs('+m')">({{currentTitle}})</span></h1>
      <div v-if="currentBar && isAdmin" :is="currentBar"></div>
    <adifia-navigator v-if="mqIs('-l')" />
  </header>
</template>
<script>
import {mapState, mapGetters} from 'vuex'

import rswToggleInput from 'rsw-vue-components/components/RSWToggleInput.vue'
import AdifiaNavigator from '~/components/AdifiaNavigator.vue'

import AdifiaPhotoToolbar from '~/components/AdifiaPhotoToolbar.vue'


export default {
  components: {rswToggleInput, AdifiaNavigator, AdifiaPhotoToolbar},
  data() {
    return {
      toggled: false
    }
  },
  computed: {
    ...mapState(['currentTitle', 'loaded', 'currentBar']),
    ...mapGetters('sessions', ['isAdmin']),
    ...mapState(['widthW', 'widths'])
  },
  created() {
    debugger
  },
  watch: {
    toggled(old, newVal) {
      this.$emit('input', newVal)
      
    }
  }
}
</script>
