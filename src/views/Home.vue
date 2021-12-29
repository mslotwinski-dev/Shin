<template>
  <About />
  <Forms />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import About from '@/components/Home/About.vue'
import Forms from '@/components/Home/Forms.vue'

export default defineComponent({
  components: {
    About,
    Forms,
  },
})
</script>
