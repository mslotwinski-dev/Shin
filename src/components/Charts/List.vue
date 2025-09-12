<template>
  <div v-for="lang in array" :key="lang">
    <div>
      <b>
        {{ lang[0] }}:
        {{ Math.round((10000 * lang[1]) / sumValues(langs)) / 100 }}%
      </b>
      {{ Math.round((100 * lang[1]) / 1024) / 100 }}kB )
    </div>
  </div>
  <div>{{ sumValues(langs) }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    langs: {
      type: Object as () => {
        [key: string]: number
      },
    },
  },
  data() {
    return {
      array: [] as [string, number][],
    }
  },
  mounted() {
    for (const lang in this.langs) {
      this.array.push([lang, this.langs[lang]])
    }
    this.array.sort((a: [string, number], b: [string, number]) => b[1] - a[1])
  },
  methods: {
    sumValues(obj: { [key: string]: number }) {
      let res = 0 as number
      Object.values(obj).length > 1
        ? (res = Object.values(obj).reduce((a, b) => a + b))
        : (res = 0)
      return res
    },
  },
})
</script>

<style lang="scss" scoped></style>
