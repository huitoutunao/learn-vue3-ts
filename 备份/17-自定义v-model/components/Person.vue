<template>
  <div class="page">
    <h3>父组件</h3>
    <!-- HTML标签上使用 v-model -->
    <!-- <input type="text" v-model="username" /> -->
    <!-- <input type="text" :value="username" @input="username = (<HTMLInputElement>$event.target).value"> -->

    <!-- v-model 用在组件标签上 -->
    <!-- 对于自定义事件，$event 就是触发事件时传递的数据 -->
    <!-- <MyInput :modelValue="username" @update:model-value="username = $event" /> -->
    <MyInput v-model="username" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MyInput from './MyInput.vue'

defineOptions({
  name: 'Person',
})

const username = ref('zhangsan')
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
  margin: 0 10px;
}
</style>
