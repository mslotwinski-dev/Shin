<template>
  <div class="item">
    <Header :repo="repo" />
    <Bar :langs="langs" :repo-full-name="repo.full_name" />

    <div class="list">
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
import Header from './Header.vue'
import Bar from './Bar.vue'

export default defineComponent({
  components: {
    Header,
    Bar,
  },
  props: {
    repo: {
      type: Object as () => any,
      required: true,
    },
    langs: {
      type: Object as () => { [key: string]: { [key: string]: number } },
      required: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  margin: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  flex-grow: 1;
}

.list {
  font-size: 12px;
}
</style>
