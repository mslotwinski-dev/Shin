<template>
  <Langs v-if="showLangs" :repositories="repositories" :params="params" />
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

    // policz wszystkie requesty
    let requests = 1
    if (this.params.organizations) requests += this.params.organizations.length
    if (this.params.repositories) requests += this.params.repositories.length
    this.waitingFor = requests
    this.$store.commit('setAllRequests', requests)

    const allOrgs = [this.params.username, ...(this.params.organizations || [])]

    await Promise.all(
      allOrgs.map(async (org) => {
        const url =
          org === this.params.username
            ? `https://api.github.com/users/${org}/repos?per_page=300`
            : `https://api.github.com/orgs/${org}/repos?per_page=300`

        try {
          const res: AxiosResponse<
            Endpoints['GET /users/{username}/repos']['response']['data']
          > = await axios.get(url, {
            headers: { Authorization: `token ${token}` },
          })

          // filtrujemy forki
          this.repositories = this.repositories.concat(
            res.data.filter((repo) => !repo.fork)
          )
        } catch (e) {
          console.error(`Błąd pobierania repozytoriów dla ${org}`, e)
        } finally {
          this.waitingFor--
          this.$store.commit('pushRequest')
          if (this.waitingFor === 0) this.showLangs = true
        }
      })
    )
  },
})
</script>

<style lang="scss" scoped></style>
