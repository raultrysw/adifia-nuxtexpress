<template>
  <div class="">
    <v-list v-for="(sublist, index) in lists" :key="index">
      <v-subheader class="subheading">{{index}}</v-subheader>
      <v-list-tile v-for="(item, index) in sublist" :key="index">
        <v-list-tile-title class="ma-0">
          <a :href="item.url" target="blank" :title="item.text">{{item.text}}</a>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
  export default {
    computed: {
      lists () {
        return this.$store.state.lists
      }
    }
  }
</script>
