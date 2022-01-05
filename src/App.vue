<template>
  <Navbar v-if="$route.query.chart != 'true'" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './components/Navbar.vue'

export default defineComponent({
  components: {
    Navbar,
  },
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

*,
*:before,
*:after {
  box-sizing: border-box;
  position: relative;
}

*::-moz-selection {
  /* Code for Firefox */
  background: #00a3cc !important;
}

*::selection {
  background: #00a3cc !important;
}

html {
  font-family: 'Rubik', sans-serif !important;
}

body {
  padding: 0px !important;
  margin: 0px !important;
  overflow-x: hidden;
  background-color: #ebeaed;
  min-height: 100vh;
  color: #262626;
}

button,
select {
  cursor: pointer;
}

button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 0 !important;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

:root {
  --main: #c3002f;
}
</style>
