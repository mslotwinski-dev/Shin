<template>
  <Loading
    :class="{
      hide: $store.getters.getAllRequests == $store.getters.getDoneRequests,
    }"
  />
  <div class="container">
    <User :username="params.username" v-if="params.chart != 'true'" />
    <Repos :params="params" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Params } from '@/data/types'
import Loading from '@/components/Results/Loading.vue'
import User from '@/components/Results/User.vue'
import Repos from '@/components/Results/Repos.vue'

export default defineComponent({
  components: {
    Loading,
    User,
    Repos,
  },
  data() {
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
