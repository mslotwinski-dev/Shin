<template>
  <div :class="{ onlychart: $route.query.chart == 'true' }">
    <canvas ref="canvas" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chart as ChartJS, registerables } from 'chart.js'
import { colors } from '@/data/colors'

ChartJS.register(...registerables)

export default defineComponent({
  name: 'ChartLanguages',
  props: {
    langs: {
      type: Object as () => { [key: string]: number },
      required: true,
    },
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chart: null as any,
      buildTimer: null as number | null,
      isBuilding: false,
    }
  },
  mounted() {
    this.scheduleBuild(0)
  },
  beforeUnmount() {
    if (this.buildTimer) {
      clearTimeout(this.buildTimer)
      this.buildTimer = null
    }
    if (this.chart) {
      try {
        this.chart.destroy()
      } catch (e) {
        /* nope */
      }
      this.chart = null
    }
  },
  watch: {
    langs: {
      deep: true,
      handler() {
        this.scheduleBuild(60)
      },
    },
  },
  methods: {
    scheduleBuild(delay = 80) {
      if (this.buildTimer) clearTimeout(this.buildTimer)
      this.buildTimer = window.setTimeout(() => {
        this.buildTimer = null
        this.buildOrUpdate()
      }, delay)
    },

    normalizeLangArray(langsObj: { [k: string]: number }) {
      const map = new Map<string, { label: string; value: number }>()
      for (const [raw, val] of Object.entries(langsObj || {})) {
        const n = Number(val)
        if (!raw || isNaN(n) || n <= 0) continue
        const keyLower = raw.trim().toLowerCase()
        if (map.has(keyLower)) {
          map.get(keyLower)!.value += n
        } else {
          map.set(keyLower, { label: raw.trim(), value: n })
        }
      }
      return Array.from(map.values()).map(
        (it) => [it.label, it.value] as [string, number]
      )
    },

    async buildOrUpdate() {
      if (this.isBuilding) return
      this.isBuilding = true

      const arr = this.normalizeLangArray(this.langs)
      arr.sort((a, b) => b[1] - a[1])

      const canvas = this.$refs.canvas as HTMLCanvasElement | undefined
      if (!canvas || arr.length === 0) {
        if (this.chart) {
          try {
            this.chart.destroy()
          } catch (e) {
            /* nope */
          }
          this.chart = null
        }
        this.isBuilding = false
        return
      }

      const labels = arr.map(([l]) => l)
      const dataValues = arr.map(([, v]) => v)
      const bgColors = arr.map(
        ([lang]) => colors[lang] ?? colors[lang.toLowerCase()] ?? '#999'
      )

      if (this.chart) {
        try {
          this.chart.options.animation = { duration: 200 } // np. 600ms
          this.chart.data.labels = labels
          this.chart.data.datasets[0].data = dataValues
          this.chart.data.datasets[0].backgroundColor = bgColors
          this.chart.update('active')
          this.isBuilding = false
          return
        } catch (e) {
          try {
            this.chart.destroy()
          } catch (ee) {
            /* nope */
          }
          this.chart = null
        }
      }

      await this.$nextTick()
      try {
        this.chart = new ChartJS(canvas, {
          type: 'pie',
          data: {
            labels,
            datasets: [
              {
                label: 'My languages',
                data: dataValues,
                backgroundColor: bgColors,
                hoverOffset: 4,
              },
            ],
          },
          options: {
            animation: {
              animateRotate: false,
              animateScale: false,
            },
            responsive: true,
            maintainAspectRatio: false,
          },
        })
      } catch (e) {
        this.chart = null
      } finally {
        this.isBuilding = false
      }
    },
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
canvas {
  display: block;
  width: 100% !important;
  height: 550px !important;
  @media (max-width: 600px) {
    height: 450px !important;
  }
}
</style>
