<script setup>
import { RouterView } from 'vue-router'
import Header from "./components/header/Header.vue"
</script>

<template>
    <Header/>
    <RouterView />
</template>

<style lang="scss">
@import './assets/base.css';
/*
font-family: 'Roboto', sans-serif;
font-family: 'Roboto Mono', monospace;
font-family: 'Eczar', serif;
*/

#app {
  max-width: 1440px;
  font-weight: normal;
  background: #FFFFFF;
  margin: 0 auto;
  scroll-behavior: smooth;
}

@media (max-width: 1024px) {
  #app {
    max-width: 1024px;
  }
}
@media (max-width: 375px) {
  #app {
    max-width: 375px;
    padding: 0 2rem;
  }
}
</style>
