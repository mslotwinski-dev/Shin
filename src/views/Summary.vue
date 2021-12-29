<template>
  <User :username="params.username" />
  <Repos :params="params" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Params } from '@/data/types'
import User from '@/components/Results/User.vue'
import Repos from '@/components/Results/Repos.vue'

export default defineComponent({
  components: {
    User,
    Repos,
  },
  data() {
    return {
      params: {
        username: this.$route.query.username,
        organizations: this.$route.query.orgs,
        repositories: this.$route.query.repos,
      } as Params,
    }
  },
})
</script>
