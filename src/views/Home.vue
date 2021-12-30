<template>
  <About />
  <Forms />
  <Token />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import About from '@/components/Home/About.vue'
import Forms from '@/components/Home/Forms.vue'
import Token from '@/components/Home/Token.vue'

export default defineComponent({
  components: {
    About,
    Forms,
    Token,
  },
})
</script>
