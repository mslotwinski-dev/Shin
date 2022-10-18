<template>
  <div>
    <!-- <List :langs="langs" /> -->
    <Chart :langs="langs" :key="key" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios, { AxiosResponse } from 'axios'
import { Endpoints } from '@octokit/types'
// import List from './Charts/List.vue'
import Chart from './Charts/Chart.vue'
import { Params } from '@/data/types'

export default defineComponent({
  props: {
    params: {
      type: Object as () => Params,
      required: true,
    },
    repositories: {
      type: Object as () => Endpoints['GET /orgs/{org}/repos']['response']['data'],
      required: true,
    },
  },
  data() {
    return {
      langs: {} as {
        [key: string]: number
      },
      done: [] as string[],
      key: 0,
    }
  },
  components: {
    // List,
    Chart,
  },
  mounted() {
    this.fetchLangs()
  },
  methods: {
    async fetchLangs() {
      let token: string
      this.$store.getters.getToken
        ? (token = this.$store.getters.getToken)
        : (token = process.env.VUE_APP_TOKEN)

      let array = this.repositories.map((repo) => repo.full_name)
      if (this.params.repositories) array.concat(this.params.repositories)

      this.$store.commit('setAllRequests', array.length)

      for (const repo of array) {
        const url = `https://api.github.com/repos/${repo}/languages`
        await axios
          .get(url, {
            headers: {
              Authorization: `token ${token}`,
            },
          })
          .then(
            (
              response: AxiosResponse<
                Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data']
              >
            ) => {
              if (!this.done.includes(url)) {
                Object.keys(response.data).forEach((lang) => {
                  this.langs[lang]
                    ? (this.langs[lang] =
                        this.langs[lang] + response.data[lang])
                    : (this.langs[lang] = response.data[lang])
                })
                this.done.push(url)
                this.key++
              }
              this.$store.commit('pushRequest')
            }
          )
      }
    },
  },
  watch: {
    repositories: {
      immediate: true,
      async handler() {
        await this.fetchLangs()
      },
    },
  },
})
</script>

<style lang="scss" scoped></style>
