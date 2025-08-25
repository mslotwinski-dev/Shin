<template>
  <div>
    <div class="important">
      <button @click="toggleIgnore" :disabled="blocked">
        {{ ignore ? 'Ignorowane' : 'Ignoruj' }}
      </button>
      <div>Ignoruj języki pomocnicze</div>
    </div>

    <!-- przekazujemy filteredLangs (zawsze nowy obiekt) -->
    <Chart :langs="filteredLangs" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios, { AxiosResponse } from 'axios'
import { Endpoints } from '@octokit/types'
import Chart from './Charts/Chart.vue'
import { Params } from '@/data/types'
import idontlikeu from '@/data/idontlikeu'

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
  components: { Chart },
  data() {
    return {
      langs: {} as { [key: string]: number },
      done: [] as string[],
      ignore: false,
      blocked: false,
    }
  },
  computed: {
    // ZAWSZE zwracamy nowy obiekt (shallow copy), żeby prop referencja się zmieniała
    filteredLangs(): { [key: string]: number } {
      const plain = { ...this.langs } // nowy obiekt
      if (!this.ignore) return plain

      const ignoreSet = new Set(
        (idontlikeu || []).map((l: string) =>
          (l || '').toString().trim().toLowerCase()
        )
      )

      const out: { [key: string]: number } = {}
      for (const [lang, val] of Object.entries(plain)) {
        if (!ignoreSet.has(lang.trim().toLowerCase())) out[lang] = val
      }
      return out
    },
  },
  methods: {
    toggleIgnore() {
      if (this.blocked) return
      this.ignore = !this.ignore
      this.blocked = true
      setTimeout(() => {
        this.blocked = false
      }, 1000)
    },

    async fetchLangs() {
      let token: string
      this.$store.getters.getToken
        ? (token = this.$store.getters.getToken)
        : (token = process.env.VUE_APP_TOKEN)

      let array = this.repositories.map((repo) => repo.full_name)
      if (this.params.repositories) {
        array = array.concat(this.params.repositories)
      }

      this.$store.commit('setAllRequests', array.length)

      await Promise.all(
        array.map(async (repo) => {
          const url = `https://api.github.com/repos/${repo}/languages`
          try {
            const response: AxiosResponse<
              Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data']
            > = await axios.get(url, {
              headers: { Authorization: `token ${token}` },
            })

            if (!this.done.includes(url)) {
              for (const lang of Object.keys(response.data)) {
                // aktualizujemy reaktywnie (Vue3 proxy)
                this.langs[lang] = (this.langs[lang] || 0) + response.data[lang]
              }
              this.done.push(url)
            }
          } catch (e) {
            // console.error(`Błąd pobierania języków dla ${repo}`, e)
          } finally {
            this.$store.commit('pushRequest')
          }
        })
      )
    },
  },
  watch: {
    repositories: {
      immediate: true,
      async handler() {
        this.langs = {}
        this.done = []
        await this.fetchLangs()
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
  button {
    margin: 10px 0;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    background-color: #c3002f;
    color: #e3e3e3;
    width: 120px;
  }
}
</style>
