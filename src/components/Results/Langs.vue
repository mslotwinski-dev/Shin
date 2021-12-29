<template>
  <div>
    <b>details</b>
    {{ langs }}
    {{ sum }}
    {{ done }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Endpoints } from '@octokit/types'
import axios from '@/config/axios'
import { AxiosResponse } from 'axios'

export default defineComponent({
  props: {
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
      sum: 0 as number,
      done: [] as string[],
    }
  },
  methods: {
    async fetchLangs() {
      this.langs = {}
      for (const repo of this.repositories) {
        const url = `https://api.github.com/repos/${repo.full_name}/languages`
        await axios
          .get(url)
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
                  this.sum += response.data[lang]
                })
                this.done.push(url)
              }
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
