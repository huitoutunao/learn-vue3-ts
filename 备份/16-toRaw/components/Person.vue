<template>
  <div class="page">
    <h2>自我介绍</h2>
    <h3>姓名：{{ reactivePerson.name }}</h3>
    <h3>年龄：{{ reactivePerson.age }}</h3>
    <h3>职业：{{ reactivePerson.job || '' }}</h3>
    <button @click="changePerson">新增职业</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue';

defineOptions({
  name: 'Person',
})

type person = {
  name: string;
  age: number;
  job?: string;
}
const person: person = {
  name: '张三',
  age: 18,
}
const reactivePerson = reactive(person)

const changePerson = () => {
  // 返回其原始对象
  const raw = toRaw(reactivePerson)
  console.log('@@', raw)
  raw.job = '程序员' // 数据有变化，但页面不更新
}
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
  margin: 0 10px;
}
</style>
