<template>
  <div class="mobileflex">
    <div class="important">
      <button @click="toggleIgnore" :disabled="blocked">
        {{ ignore ? 'Pokaż języki pomocnicze' : 'Ignoruj języki pomocnicze' }}
      </button>
      <div></div>
    </div>
    <div class="chartcontainer">
      <Chart :langs="filteredLangs" />
    </div>
    <RepoList
      v-if="Object.keys(repolangs).length > 1"
      :repositories="repositories"
      :langs="repolangs"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Endpoints } from '@octokit/types'

import { Params } from '@/data/types'
import idontlikeu from '@/data/idontlikeu'
import { fetchLanguages } from '@/services/github'

import Chart from '@/components/Charts/Chart.vue'
import RepoList from './RepoList.vue'

export default defineComponent({
  props: {
    params: {
      type: Object as () => Params,
      required: true,
    },
    repositories: {
      type: Array as () => Endpoints['GET /orgs/{org}/repos']['response']['data'],
      required: true,
    },
  },
  components: {
    Chart,
    RepoList,
  },
  data() {
    return {
      langs: {} as { [key: string]: number },
      repolangs: {} as { [key: string]: { [key: string]: number } },
      ignore: true,
      blocked: false,
    }
  },
  computed: {
    filteredLangs(): { [key: string]: number } {
      const plain = { ...this.langs }
      if (!this.ignore) return plain

      const ignoreSet = new Set(
        (idontlikeu || []).map((l: string) =>
          (l || '').toString().trim().toLowerCase()
        )
      )

      const out: { [key: string]: number } = {}
      for (const [lang, val] of Object.entries(plain)) {
        if (!ignoreSet.has(lang.trim().toLowerCase()) && val > 800) {
          out[lang] = val
        }
      }

      return out
    },
  },
  methods: {
    toggleIgnore() {
      if (this.blocked) return
      this.ignore = !this.ignore
    },
  },
  watch: {
    repositories: {
      immediate: true,
      async handler() {
        const { langs, repolangs } = await fetchLanguages(
          this.repositories,
          this.params,
          this.$store
        )
        this.langs = langs
        this.repolangs = repolangs
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.important {
  margin-bottom: 8px;
}
.important {
  margin: 10px 0;
  display: flex;
  gap: 10px;
  align-items: center;
  @media (max-width: 600px) {
    justify-content: center;
  }

  button {
    margin: 10px 0;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    background-color: #c3002f;
    color: #e3e3e3;
    width: 250px;
  }
}

.chartcontainer {
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
