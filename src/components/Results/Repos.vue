<template>
  <!-- <div v-for="(repo, index) in repositories" :key="index">
    {{ index }} {{ repo }}
  </div> -->
  <Langs v-if="showLangs" :repositories="repositories" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Endpoints } from '@octokit/types'
import Langs from './Langs.vue'
import axios from 'axios'
import { Params } from '@/data/types'
import { AxiosResponse } from 'axios'

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
      waitingFor: 1,
      showLangs: false,
    }
  },
  async mounted() {
    let token: string
    this.$store.getters.getToken
      ? (token = this.$store.getters.getToken)
      : (token = process.env.VUE_APP_TOKEN)

    this.waitingFor = 1
    this.params.organizations &&
      (this.waitingFor += this.params.organizations.length)
    this.params.repositories &&
      (this.waitingFor += this.params.repositories.length)

    for (const org of [this.params.username].concat(
      this.params.organizations
    )) {
      this.repositories = this.repositories.concat(
        await axios
          .get(`https://api.github.com/users/${org}/repos`, {
            headers: {
              Authorization: `token ${token}`,
            },
          })
          .then(
            (
              res: AxiosResponse<
                Endpoints['GET /users/{username}/repos']['response']['data']
              >
            ) => {
              this.waitingFor--
              this.waitingFor == 0 && (this.showLangs = true)
              return res.data.filter((repo) => !repo.fork)
            }
          )
      )
    }
  },
})
</script>

<style lang="scss" scoped></style>
