<template>
  <div class="container">
    <div class="item" v-for="(repo, index) in repositories" :key="index">
      <div class="header">
        <div>{{ repo.name }}</div>
        <div class="lan">
          <div
            class="dot"
            :style="{ backgroundColor: colors[repo.language] }"
          />
          {{ repo.language }}
        </div>
      </div>

      <div class="bar" v-if="langs && langs[repo.full_name]">
        <div
          v-for="(val, lang) in langs[repo.full_name]"
          :key="lang"
          :style="{
            width:
              (100 * val) /
                Object.values(langs[repo.full_name]).reduce(
                  (a, b) => a + b,
                  0
                ) +
              '%',
            backgroundColor: colors[lang] || '#999',
          }"
        >
          {{
            Math.round(
              (10000 * val) /
                Object.values(langs[repo.full_name]).reduce((a, b) => a + b, 0)
            ) /
              100 >
            5
              ? Math.round(
                  (10000 * val) /
                    Object.values(langs[repo.full_name]).reduce(
                      (a, b) => a + b,
                      0
                    )
                ) /
                  100 +
                '%'
              : ''
          }}
        </div>
      </div>

      {{
        langs[repo.full_name]
          ? Object.entries(langs[repo.full_name])
              .filter(
                ([, v]) =>
                  v /
                    Object.values(langs[repo.full_name]).reduce(
                      (a, b) => a + b,
                      0
                    ) >
                  0.005
              )
              .map(([lang, val]) => `${lang}: ${val}`)
              .join(', ')
          : 'No data'
      }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Endpoints } from '@octokit/types'
import { colors } from '@/data/colors'

export default defineComponent({
  props: {
    repositories: {
      type: Array as () => Endpoints['GET /orgs/{org}/repos']['response']['data'],
      required: true,
    },
    langs: {
      type: Object as () => { [key: string]: { [key: string]: number } },
      required: false,
    },
  },
  data() {
    return { colors }
  },
})
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 900px;
}

.item {
  margin: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  flex-grow: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.lan {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}

.bar {
  height: 30px;
  background-color: #e3e3e3;
  border-radius: 10px;
  margin: 15px;
  display: flex;
  max-width: 800px;
  overflow: hidden;

  > div {
    height: 100%;
    text-align: center;
    color: #e3e3e3;
    font-weight: bold;
    font-size: 12px;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0px 0px 2px #000;
  }
}
</style>
