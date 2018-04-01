<template>
  <div>
    <rsw-toggle-input v-model="viewAll">
      <font-awesome-icon icon="eye" />
    </rsw-toggle-input>
  </div>
</template>
<script>
import rswToggleInput from 'rsw-vue-components/components/RSWToggleInput.vue'

export default {
  components: {rswToggleInput},
  computed: {
    viewAll: {
      get() {
        return this.$store._modules.root._children.photos.state.viewAll
      },
      set(value) {
        this.$store._modules.root._children.photos.state.viewAll = value
        console.log(this.$store._modules.root._children.photos.state.viewAll)
      }
    }
  }
}
</script>
