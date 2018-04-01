<template>
  <section class="container">
    <h2>Bienvenido a Adifia</h2>
    <adifia-slider />
  </section>
</template>

<script>
import AdifiaSlider from '~/components/AdifiaSlider.vue'
export default {
  components: {AdifiaSlider},
  created() {
    this.$store.commit('context',{title:'Página pincipal', bar: ''})
  }
}
</script>

<style></style>
