<template>
  <div class="page">
    <h1 ref="h1title">中国</h1>
    <h2>北京</h2>
    <h3>长城</h3>
    <button @click="showDom">点我显示dom</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

defineOptions({
  name: 'Person',
})

const a = ref('a')
const b = ref('b')
const c = ref('c')

const h1title = ref()
const showDom = () => {
  console.log(h1title.value)
}

defineExpose({
  a,
  b,
  c,
})
</script>
