<template>
    <section class="profile-page" v-if="showui">
        <div class="profile-page__section--info">
            <rsw-live-preview-image :defaultImg="avatarUrl" width="15vw" height="10em" :atChange="pushImage" />
            <div class="table-view">
                <div><span>Nombre</span>{{this.user.name}}</div>
                <div><span>Apellidos</span>{{this.user.surname}}</div>
                <div><span>Correo electrónico</span>{{this.user.email}}</div>
            </div>
        </div>
        <div class="profile-page__section--management" v-if="isVocal">
            <div class="profile-page__section--management__switcher">
                <select v-if="isAdmin" v-model="optionChoosen">
                    <option value="1">Articulos</option>
                    <option value="2">Usuarios</option>
                </select>
            </div>
            <transition name="fadeInDown" mode="out-in" appear>
              <div class="profile-page__section--management__articles" key="a" v-if="optionChoosen === '1'">
                  <adifia-articles-management v-if="isVocal" />
              </div>
              <div class="profile-page__section--management__users" key="n" v-else-if="optionChoosen === '2'">
                  <adifia-memebers-management v-if="isAdmin" />
              </div>
              <div v-else></div>
            </transition>
        </div>
        <div class="profile-page__section--private-actions" v-else>
            <h3>Eeres socio</h3>
        </div>
    </section>
</template>
<script>
import { mapGetters, mapState } from "vuex";

import AdifiaArticlesManagement from "~/components/AdifiaArticlesManagement";
import AdifiaMemebersManagement from "~/components/AdifiaMembersManagement";

import rswLivePreviewImage from "rsw-vue-components/components/RSWLivePreviewImage.vue";

const MEMBERS_URI = "/members/serv/avatar";

export default {
  components: {
    AdifiaArticlesManagement,
    rswLivePreviewImage,
    AdifiaMemebersManagement
  },
  data() {
    return {
      showui: false,
      articles: [],
      reloadedFirstTime: false,
      optionChoosen: "1",
      avatarUrl: "",
      data: null
    };
  },
  mounted() {
    if (!this.$store.state.sessions.logged) {
      return this.$router.push("/");
    }
    this.$store.commit("context", { title: "Tu página privada", bar: "" });
    this.showui = true;

    this.avatarUrl = this.user.avatar
      ? "http://localhost:7000/assets/img/avatars/" + this.user._id + ".png"
      : "http://localhost:7000/assets/img/avatars/default.png";
  },
  methods: {
    pushImage(file, dataB64) {
      let data = new FormData();
      data.append("avatar", file);
      let options = { headers: this.$store.getters.headers };

      this.data = dataB64;

      this.makeRequest(
        { url: MEMBERS_URI, data, options },
        "put",
        this.updateAvatarInfo.bind(this),
        ({ errors }) => console.log(errors)
      );
    },
    updateAvatarInfo(response) {
      this.$store.state.sessions.user.avatar = true;
      this.$store.dispatch("saveToken");
      this.avatarUrl = this.data;
    }
  },
  computed: {
    ...mapState("sessions", ["user"]),
    ...mapGetters("sessions", ["isVocal", "isAdmin", "avatarUrl"]),
    ...mapGetters(["headers"])
  }
};
</script>