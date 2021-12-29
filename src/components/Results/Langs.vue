<template>
  <div>
    <b>details</b>
  </div>
  SUM: {{ sum }}
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
    }
  },
  async updated() {
    for (const repo of this.repositories) {
      await axios
        .get(`https://api.github.com/repos/${repo.full_name}/languages`)
        .then(
          (
            response: AxiosResponse<
              Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data']
            >
          ) => {
            Object.keys(response).forEach((lang) => {
              this.langs[lang]
                ? (this.langs[lang] = this.langs[lang] + response.data[lang])
                : (this.langs[lang] = response.data[lang])
              this.sum += response.data[lang]
            })
          }
        )
    }
  },
})
</script>

<style lang="scss" scoped></style>
