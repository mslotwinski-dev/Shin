<template>
  <div>
    <img src="@/assets/shin.png" />
    <b>Summary of your work on github</b>
    <p>Written in Vue and Gin</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
div {
  width: 700px;
  max-width: 95vw;
  margin: 5px auto;
  padding: 10px;
  text-align: center;
}
img {
  height: 200px;
}
p {
  display: block;
  font-size: 24px;
  padding: 5px;
}
b {
  display: block;
  font-weight: 500;
  padding: 5px;
  font-size: 28px;
}
</style>
