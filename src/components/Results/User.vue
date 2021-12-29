<template>
  <div>{{ username }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Endpoints } from '@octokit/types'
import axios from '@/config/axios'

export default defineComponent({
  props: {
    username: String,
  },
  data() {
    return {
      user: {} as Endpoints['GET /users/{username}']['response']['data'],
    }
  },
  async mounted() {
    this.user = await axios.get(`https://api.github.com/users/${this.username}`)
  },
})
</script>

<style lang="scss" scoped></style>
