<template>
  <div class="header">
    <div>{{ repo.name }}</div>
    <div class="lan">
      <div class="dot" :style="{ backgroundColor: colors[repo.language] }" />
      {{ repo.language }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { colors } from '@/data/colors'

export default defineComponent({
  props: {
    repo: {
      type: Object as () => { name: string; language: string },
      required: true,
    },
  },
  data() {
    return { colors }
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 15px;
}

.lan {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}
</style>
