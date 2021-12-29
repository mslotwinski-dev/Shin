<template>
  <nav>
    <router-link to="/">
      <img src="@/assets/shin.png" />
    </router-link>
    <a href="https://github.com/Shin-Stats">
      <ic :icon="['fab', 'github']"></ic>
    </a>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
nav {
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  font-size: 35px;
  background-color: #e3e3e3;
  a {
    height: 100%;
    text-decoration: none;
    color: #262626;
  }
  img {
    height: 100%;
  }
}
</style>
