<template>
    <ul class="app__navigator-bar no-list nav nav--horizontal">
        <li @click="$emit('closeAside')" class="nav__item"><nuxt-link to="/articles">Blog</nuxt-link></li>
        <li @click="$emit('closeAside')" class="nav__item"><nuxt-link to="/photos">Foto denuncia</nuxt-link></li>
    </ul>
</template>
