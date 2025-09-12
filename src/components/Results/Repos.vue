<template>
  <Langs v-if="showLangs" :repositories="repositories" :params="params" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Endpoints } from '@octokit/types'
import Langs from '../Render/Langs.vue'
import { Params } from '@/data/types'
import { fetchRepositories } from '@/services/github'

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
      showLangs: false,
    }
  },
  async mounted() {
    this.repositories = await fetchRepositories(this.params, this.$store)
    this.showLangs = true
  },
})
</script>
