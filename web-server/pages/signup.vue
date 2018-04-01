<template>
  <div v-if="showUi">
      <rsw-form v-if="!logged" :errors="errors" submitText="Enviar" :submitHandler="registerUser" formName="new-user">
          <rsw-field-input v-model="name" type="text" text="Nombre" description="Pon tu nombre" />
          <rsw-field-input v-model="surname" type="text" text="Apelldios" description="Pon tus apellidos" />
          <rsw-field-input v-model="email" type="text" text="Correo electrónico" description="Pon tus email" />
          <rsw-field-input v-model="password" type="password" text="Contraseña" description="Pon tu contraseña" />
      </rsw-form>
      <h2 v-else>Te has logueado, <nuxt-link to="/">Vuelve a la página principal</nuxt-link></h2>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import rswForm from 'rsw-vue-components/components/RSWForm.vue'
import rswFieldInput from 'rsw-vue-components/components/RSWFieldInput.vue'

export default {
    components: {
        rswForm, rswFieldInput
    },
    data() {
        return {
            errors: [],
            showUi: false,
            name: '',
            surname: '',
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapState('sessions', ['logged'])
    },
    created() {
        if (this.$store.state.logged) {
            return this.$router.push('/')
        }
        this.$store.commit('title',{title: 'Registrate en Adifia', bar: ''})  
        this.showUi = true    
    },
    methods: {
        ...mapActions('users', ['register']),
        registerUser() {
            const {name, surname, email, password} = this
            const user = {name, surname, email, password}
            
            this.register({user}).then(response => {
                console.log(response);
                
                if (response.data.status === 'ok') this.$router.push('/')
                else this.errors = response.data.errors;
            })
        }
    }
}
</script>
