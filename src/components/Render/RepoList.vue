<template>
  <div class="container">
    <Repo
      v-for="(repo, index) in new Object(repositories).sort((a, b) =>
        a.name.localeCompare(b.name)
      )"
      :key="index"
      :repo="repo"
      :langs="langs"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Endpoints } from '@octokit/types'
import Repo from './Repo.vue'

export default defineComponent({
  props: {
    repositories: {
      type: Array as () => Endpoints['GET /orgs/{org}/repos']['response']['data'],
      required: true,
    },
    langs: {
      type: Object as () => { [key: string]: { [key: string]: number } },
      required: false,
    },
  },
  components: {
    Repo,
  },
})
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 900px;
}

.mobileflex {
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    flex-grow: 1;
  }
}
</style>
