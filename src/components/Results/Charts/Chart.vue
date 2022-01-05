<template>
  <div :class="{ onlychart: this.$route.query.chart == 'true' }">
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chart, registerables } from 'chart.js'
import { colors } from '@/data/colors'
Chart.register(...registerables)

export default defineComponent({
  props: {
    langs: {
      type: Object as () => {
        [key: string]: number
      },
      required: true,
    },
  },
  data() {
    return {
      key: 0,
      colors,
      array: [] as [string, number][],
    }
  },
  mounted() {
    // sorting array
    for (const lang in this.langs) {
      this.array.push([lang, this.langs[lang]])
    }
    this.array.sort((a: [string, number], b: [string, number]) => b[1] - a[1])

    const data = {
      labels: this.array.map((lang: [string, number]) => lang[0]),
      datasets: [
        {
          label: 'My languages',
          data: this.array.map((lang: [string, number]) => lang[1]),
          backgroundColor: this.array.map(
            (lang: [string, number]) => colors[lang[0]]
          ),
          hoverOffset: 4,
        },
      ],
    }
    const ctx = document.querySelector('canvas')
    if (ctx) {
      new Chart(ctx, { type: 'pie', data: data })
    }
  },
})
</script>

<style lang="scss" scoped>
div {
  width: 700px;
  max-width: 80vw;
  &.onlychart {
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    canvas {
      max-height: 90vh;
      max-width: 90vw;
    }
  }
}
</style>
