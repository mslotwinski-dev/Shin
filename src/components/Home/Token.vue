<template>
  <div class="cont">
    <div>
      Got limit of data? Try using your github access token!
      <i>(Optional)</i>
      {{ this.$store.getters.getToken }}
    </div>
    <a href="https://github.com/settings/tokens/new">Create your token here</a>
    <input placeholder="example - ghp_bx21v37c..." v-model="token" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    token: {
      get() {
        return this.$store.state.token
      },
      set(value: string) {
        this.$store.commit('setToken', value)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.cont {
  text-align: center;
}
a {
  text-decoration: none;
  color: #c3002f;
}
input {
  font-family: Rubik;
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 16px;
  border: 3px solid gray;
  display: block;
  margin: 5px auto;
  width: 330px;
}
</style>
