<template>
  <div v-if="showUi">
      <rsw-form v-if="!logged" :errors="errors" submitText="Enviar" :submitHandler="registerUser" formName="new-user">
          <rsw-filed-input-group title="Datos basicos">
            <rsw-field-input v-model="name" type="text" text="Nombre" description="Pon tu nombre" />
            <rsw-field-input v-model="surname" type="text" text="Apelldios" description="Pon tus apellidos" />
          </rsw-filed-input-group>
          <rsw-filed-input-group title="Datos de la cuenta" :vertical="true">
            <rsw-field-input v-model="email" type="text" text="Correo electrónico" description="Pon tu email" />
            <rsw-field-input v-model="password" type="password" text="Contraseña" description="Pon tu contraseña" />
          </rsw-filed-input-group>
      </rsw-form>
      <h2 v-else>Te has logueado, <nuxt-link to="/">Vuelve a la página principal</nuxt-link></h2>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import rswForm from 'rsw-vue-components/components/RSWForm.vue'
import rswFieldInput from 'rsw-vue-components/components/RSWFieldInput.vue'
import rswFiledInputGroup from 'rsw-vue-components/components/RSWFieldGroupInput.vue'

let REGISTER_URL = '/members'

export default {
    components: {
        rswForm, rswFieldInput, rswFiledInputGroup
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
        this.$store.commit('context',{title: 'Registrate en Adifia', bar: ''})  
        this.showUi = true    
    },
    methods: {
        registerUser() {
            const {name, surname, email, password} = this
            const user = {name, surname, email, password}
            
            let url = REGISTER_URL
            let data = user

            this.makeRequest({url, data}, 'post',
                this.redirect.bind(this),
                this.logErrors.bind(this)
            )
        },
        redirect(response) {
            this.$router.push('/');
        },
        logErrors({errors}) {
            this.errors = errors;
        }
    }
}
</script>
