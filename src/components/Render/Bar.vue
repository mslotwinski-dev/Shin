<template>
  <div class="bar" v-if="hasLangs">
    <div
      v-for="(val, lang) in langs[repoFullName]"
      :key="lang"
      :style="{
        width: calculatePercentage(val) + '%',
        backgroundColor: colors[lang] || '#999',
      }"
    >
      {{ calculatePercentage(val) > 5 ? calculatePercentage(val) + '%' : '' }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { colors } from '@/data/colors'

export default defineComponent({
  props: {
    langs: {
      type: Object,
      required: true,
      validator: (value: any) => {
        return typeof value === 'object' && value !== null
      },
    },
    repoFullName: {
      type: String,
      required: true,
    },
  },
  data() {
    return { colors }
  },
  computed: {
    totalBytes(): number {
      if (!this.langs || !this.langs[this.repoFullName]) return 0

      return Object.values(this.langs[this.repoFullName]).reduce(
        (a: number, b: unknown) => a + Number(b),
        0
      )
    },
    hasLangs(): boolean {
      return !!(this.langs && this.langs[this.repoFullName])
    },
  },
  methods: {
    calculatePercentage(val: number): number {
      if (this.totalBytes === 0) return 0
      return Math.round((10000 * val) / this.totalBytes) / 100
    },
  },
})
</script>

<style lang="scss" scoped>
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
