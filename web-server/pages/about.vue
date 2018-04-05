<template>
  <section class="about-page">
        <section>
            <div>
                <h1 class="text text-title">Objetivo general</h1>
                <p>Eliminar las barreras para que la ciudad de Alicante sea accesible para todos sus habitantes y motivar a todas las personas con discapacidad física de sus posibilidades para que aumenten su autoestima desarrollando su autonomía personal</p>
            </div>
        </section>
        <section>
            <div>
                <h1 class="text text-title">Objetivos específicos</h1>
                <ul>
                    <li>Ayudar a todos los socios a eliminar sus propias barreras arquitectónicas de su vida cotidiana, como pueden ser: en su domicilio, en su centro escolar, en su trabajo, en sus actividades de ocio, etc...</li>
                    <li>Promover actividades culturales y deportivas orientadas a conseguir la inclusión social.<br />Divulgar los problemas a los que se enfrentan este colectivo para mejorar sus actividades de la vida diaria</li>
                </ul>
            </div>
        </section>
        <section>
            <div>
                <h1 class="text text-title">Actividades</h1>
                <ul>
                    <li>Que toda la ciudad tenga sus respectivas rampas, normalizadas segun la legislación vigente</li>
                    <li>Que el transporte público este bien adaptado</li>
                    <li>Las entidades públicas ofrezcan el acceso necesario para poder entrar sin dificultad</li>
                    <li>Los establecimientos de ocio y comercio como clases, teatros, cafés, restaurantes, centros culturales, museos, etc, cumplan con la normativa de eliminación de barreras arquitectónicas</li>
                    <li>Las personas respeten los aparcamientos reservados para las personas con discapacidad física</li>
                    <li>Educar a los niños sobre la discapacidad física para aasegurar un futuro basado en un excelente comportamiento cívico con este colectivo</li>
                    <li>Ayudar a las personas con discapacidad física a eliminarlas de su rpopia casa o porteria</li>
                    <li>Procurar que las escuelas institutos y universidades conozcan como eliminar las posibles barreras</li>
                </ul>
            </div>
            <p>Promover cualquier tipo de actividad que suponga la promoción de las personas con discapacidad y su plena integración en la sociedad, en todos los ámbitos de su vida; educación, cultura, formación, empleo, sanidad, ocio, etc...</p>
        </section>
        <section>
            <div>
                <h1 class="text text-title">Administradores de adifia</h1>
                <ul class="no-list">
                    <li v-for="(admin, index) in administrators" :data-aaa="index" :key="index">
                        <h2>{{admin.name}} {{admin.surname}}</h2>
                        <p>Es {{ROLS[admin.pvLvl]}}</p>
                    </li>
                </ul>
            </div>
        </section>
  </section>
</template>
<script>
import {ROLS} from '../../settings.js'
export default {
    data() {
        return {
            administrators: [], ROLS
        }
    },
    mounted() {
        this.$store.commit('context', {title:'Acerca de adifia', bar: ''})
        this.$http.get('/members/?onlyAdmin=true').then(response => {
            this.administrators = response.data.users
        })
    }
}
</script>