<template>
  <div class="page">
    <h2>当前水温：{{ temp }}</h2>
    <h2>当前水位：{{ height }}</h2>
    <button @click="changeTemp">改变温度</button>
    <button @click="changeHeight">改变水位</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

defineOptions({
  name: 'Person',
})

const temp = ref(10)
const height = ref(0)
const changeTemp = () => {
  temp.value += 1
}
const changeHeight = () => {
  height.value += 10
}

// 立即执行监听函数，且自动分析同步调用的依赖变化
watchEffect(() => {
  if (temp.value >= 60 || height.value >= 80) {
    console.log('发送请求')
  }
})
</script>
