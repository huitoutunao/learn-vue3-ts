<template>
  <div class="page">
    <h2>对话描述：{{ desc }}</h2>
    <input v-model="desc" type="text" placeholder="请输入" />
  </div>
</template>

<script setup lang="ts">
import { customRef } from 'vue'

defineOptions({
  name: 'Person',
})

// 防抖输出文案，即只在最近一次 set 调用后的一段固定间隔后再调用
const debouncedRef = (val: string, delay = 2000) => {
  let timer: number | undefined
  return customRef((track, trigger) => ({
    get() {
      track()
      return val
    },
    set(nVal) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        val = nVal
        trigger()
      }, delay)
    },
  }))
}
const desc = debouncedRef('hello')
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
  margin: 0 10px;
}
</style>
