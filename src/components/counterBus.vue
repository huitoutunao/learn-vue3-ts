<template>
  <component :is="render()"></component>
</template>

<script setup lang="ts">
import { h } from 'vue'
const render = () => {
  return h('div', '我是counter-bus')
}
</script>

<style scoped></style>
