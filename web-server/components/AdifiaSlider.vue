<template lang="html">
  <div class="slider" ref="slider">
    <article class="slider__slide">
      <div :span="24">
        <h1>¿Qiuenes somos?</h1>
        <p>Somos personas con discapacidad física y voluntarios de Alicante que deseamos eliminar los obstáculos en nuestra vida cotidiana. Las dificultades de barreras de caracter urbanístico y en otros ámbitos de la vida diaria, en la que no favorece el dessarrollo personal en el entorno mas inmediato, por ese motivo creamos ADIFIA, como medio de representación de toddas las personas de la ciudad de Alicante.</p>
      </div>
    </article>
    <article class="slider__slide">
      <div :span="24">
      <h1>¿Por que se creó?</h1>
      <p>Adifia se creo con el deseo de eliminar tanto las barreras arquitectónicas y sociales, en las que se incluyen a todas las personsa con discapacidades físicas. Dando respuesta a la solución de sus problemas en su domicilio y su ciudad.</p>
      </div>
    </article>
    <article class="slider__slide">
      <div :span="24">
        <h1>¿Quienes pueden ser socios?</h1>
        <p>Todas las personas con discapacidad física o sin ella, que estén interesados en colaborar con nosotros, estas pueden ser:</p>
        <ul>
          <li>Las personas con discapacidad física</li>
          <li>Los voluntarios</li>
          <li>Los colaboradores</li>
          <li>Patrocinadores y simpatizantes</li>
        </ul>
      </div>
    </article>
    <article class="slider__slide">
      <div :span="24">
        <h1>Finalidad</h1>
        <p>Aunar los esfuerzos y reivindicaciones de todas las personas con discapacidad física de la ciudad de alicante, para dar a conocer la problemática con la que se encuentra este colectivo y actuar en consecuencia</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slideActive: 0
    }
  },
  mounted () {
    const slider = this.$refs.slider
    const slides = slider.querySelectorAll('.slider__slide')
    Array.prototype.forEach.call(
      slides,
      (slide) => {
        slide.querySelector('h1').classList.add('title')
      }
    )
    let self = this
    slides[self.slideActive].classList.add('active')
    setInterval(() => {
      slider.querySelector('.active').classList.remove('active')
      ++self.slideActive
      if (self.slideActive >= slides.length) self.slideActive = 0
      slides[self.slideActive].classList.add('active')
    }, 4000)
    setTimeout(() => slider.classList.add('activated'), 500)
  }
}
</script>

<style lang="css">
.slider {
  background: bisque;
  height: 30vh;
  position: relative;
}
.slider__slide {
  position: absolute;
  padding: 1em;
  box-sizing: border-box;
  border: 1px solid black;
  font-size: 1.3em;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s;
}
.slider__slide.active {
  opacity: 1;
  top: 0%;
  display: block;
}
.slider ul {
  margin-left: 2em;
}
</style>