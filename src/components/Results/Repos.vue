<template>
  <div v-for="(repo, index) in repositories" :key="index">
    {{ index }} {{ repo.full_name }}
  </div>
  <Langs :repositories="repositories" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Endpoints } from '@octokit/types'
import Langs from './Langs.vue'
import axios from '@/config/axios'
import { Params } from '@/data/types'

export default defineComponent({
  props: {
    params: {
      type: Object as () => Params,
      required: true,
    },
  },
  components: {
    Langs,
  },
  data() {
    return {
      repositories:
        [] as Endpoints['GET /orgs/{org}/repos']['response']['data'],
    }
  },
  async mounted() {
    for (const org of this.params.organizations.concat(this.params.username)) {
      this.repositories = this.repositories.concat(
        (await axios.get(`https://api.github.com/users/${org}/repos`)).data
      )
    }
  },
})
</script>

<style lang="scss" scoped></style>
