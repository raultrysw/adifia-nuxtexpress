<template>
  <v-app>
    <v-container fluid class="app-layout">
      <v-toolbar  app class="topbar-page">
        <!-- <label class="switcher">
          <input type="checkbox" v-model="sideNav">
          <v-icon>menu</v-icon>
        </label> -->
        <h1 class="display-3">{{$store.state.title}}</h1>
      </v-toolbar>
      <nuxt />
      <my-aside ></my-aside>
    </v-container>
  </v-app>
</template>

<script type="text/javascript">
  import MyAside from '~/components/MyAside.vue'
  export default {
    components: {MyAside},
    computed: {
    }
  }
</script>

<style lang="scss">
.list__tile {
  height: initial !important;
}
.app-layout {
  padding: 0;
}
.switcher {
  input {display: none}
  & > input:checked + .icon {
    color: red;
  }
}
</style>
