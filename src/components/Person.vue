<template>
  <div class="page">
    <h2>情况一：监视【ref】定义的【基本类型】数据</h2>
    <h2>当前求和值：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'Person',
})

const sum = ref(0)

const unwatch = watch(sum, (nVal, oVal) => {
  console.log(nVal, oVal)
  if (nVal > 10) {
    unwatch()
  }
})

const changeSum = () => {
  sum.value += 1
}

</script>
