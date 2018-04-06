<template lang="html">
  <div class="adifia-slider" ref="slider">
    <article :class="classes(0)">
      <div>
        <h1 @click="cPoint = 0" class="slide__title">¿Quienes somos?</h1>
        <div class="slide__content">
          <p>Somos personas con discapacidad física y voluntarios de Alicante que deseamos eliminar los obstáculos en nuestra vida cotidiana. Las dificultades de barreras de caracter urbanístico y en otros ámbitos de la vida diaria, en la que no favorece el dessarrollo personal en el entorno mas inmediato, por ese motivo creamos ADIFIA, como medio de representación de toddas las personas de la ciudad de Alicante.</p>
        </div>
      </div>
    </article>
    <article :class="classes(1)">
      <div>
        <h1 @click="cPoint = 1" class="slide__title">¿Por que se creó?</h1>
        <div class="slide__content">
          <p>Adifia se creo con el deseo de eliminar tanto las barreras arquitectónicas y sociales, en las que se incluyen a todas las personsa con discapacidades físicas. Dando respuesta a la solución de sus problemas en su domicilio y su ciudad.</p>
        </div>
      </div>
    </article>
    <article @click="cPoint = 2" :class="classes(2)">
      <div>
        <h1 class="slide__title">¿Quienes pueden ser socios?</h1>
        <div class="slide__content">
          <p>Todas las personas con discapacidad física o sin ella, que estén interesados en colaborar con nosotros, estas pueden ser:</p>
          <ul>
            <li>Las personas con discapacidad física</li>
            <li>Los voluntarios</li>
            <li>Los colaboradores</li>
            <li>Patrocinadores y simpatizantes</li>
          </ul>
        </div>
      </div>
    </article>
    <article :class="classes(3)">
      <div>
        <h1 @click="cPoint = 3" class="slide__title">Finalidad</h1>
        <div class="slide__content">
          <p>Aunar los esfuerzos y reivindicaciones de todas las personas con discapacidad física de la ciudad de alicante, para dar a conocer la problemática con la que se encuentra este colectivo y actuar en consecuencia</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slideActive: 0,
      cPoint: -4,
      interval: null,
      seconds: 4 * 1000,
      slides: -1
    }
  },
  mounted() {
    this.slides = this.$el.querySelectorAll('.slide').length
    setTimeout(this.setupSlider.bind(this), 100)
  },
  methods: {
    setupSlider() {
      if (this.mqIs('+m')) {
        this.cPoint = 0
        this.interval = setInterval(this.switch.bind(this), this.seconds)
      }
    },
    switch() {
      this.cPoint = this.cPoint === (this.slides - 1) ? 0 : this.cPoint + 1
    },
    classes(number) {
      return {
        'adifia-slider__slide': true,
        'slide': true,
        'active': this.cPoint === number
      }
    },
    stopInterval() {
      clearInterval(this.interval)
    }
  }
}
</script>