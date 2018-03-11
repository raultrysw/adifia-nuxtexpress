<template lang="html">
  <div class="slider" ref="slider">
    <!--Slider-->
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
    const slides = slider.querySelectorAll('section')
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
  }
}
</script>

<style lang="css">
section {
  padding: 1em;
    height: 100%;
    width: 100%;
    background-color: bisque;
    position: absolute;
    opacity: 0;
    overflow: auto;
    transition: opacity .50s;
}
.slider {
  width: 100%;
  height: 26vh;
  margin: 0 auto;
  box-shadow: 0.3px 0.3px 0.3px 0.5px black
}
body {
    position: relative;
}

section.active {
    opacity: 1;
    transition: opacity .25s .50s;
}

</style>
