<template>
  <header>
      <rsw-toggle-input v-if="mqIs('lower', 'l')" text="mostrar aside">
        <font-awesome-icon icon="bars" />
      </rsw-toggle-input>
      <h1>Adifia</h1>
    <adifia-navigator />
  </header>
</template>
<script>
import {mapState} from 'vuex'

import rswToggleInput from 'rsw-vue-components/components/RSWToggleInput.vue'
import AdifiaNavigator from '~/components/AdifiaNavigator.vue'

export default {
  components: {rswToggleInput, AdifiaNavigator},
  data() {
    return {
      toggled: false
    }
  },
  computed: {
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
