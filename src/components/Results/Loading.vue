<template>
  <div class="back">
    <div class="loading">
      <div class="bar">
        <div
          class="progress"
          :style="{
            width:
              (100 * $store.getters.getDoneRequests) /
                $store.getters.getAllRequests +
              '%',
          }"
        ></div>
      </div>
      <div class="percentage">
        {{
          Math.round(
            (1000 * $store.getters.getDoneRequests) /
              $store.getters.getAllRequests
          ) / 10
        }}%
      </div>
      <div class="data">
        {{ $store.getters.getDoneRequests }}/{{ $store.getters.getAllRequests }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #e3e3e3;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 1;
  transition: all 1s;
}

.percentage {
  font-size: 25px;
  font-weight: 600;
}

.bar {
  width: 400px;
  max-width: 90vw;
  margin: 10px;
  border: 4px solid #262626;
  background-color: #262626;
  border-radius: 5px;
  .progress {
    height: 10px;
    background-color: #c3002f;
    border-radius: 2px;
  }
}
</style>
