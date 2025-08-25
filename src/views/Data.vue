<template>
  <div class="container">
    <Repos :params="params" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Params } from '@/data/types'
import Repos from '@/components/Data/Repos.vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export default defineComponent({
  components: {
    Repos,
  },
  data(this: { $route: RouteLocationNormalizedLoaded }) {
    return {
      params: {
        username: this.$route.query.username,
        organizations: this.$route.query.orgs,
        repositories: this.$route.query.repos,
        chart: this.$route.query.chart,
      } as Params,
    }
  },
})
</script>
<style lang="scss" scoped>
.container {
  width: 1200px;
  max-width: 90vw;
  margin: 10px auto;
}

.hide {
  opacity: 0;
  z-index: -1;
}
</style>
