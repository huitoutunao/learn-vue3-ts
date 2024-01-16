<template>
  <div class="page">
    <h2>自我介绍</h2>
    <h3>姓名：{{ person.name }}</h3>
    <h3>年龄：{{ person.age }}</h3>
    <h3>职业：{{ person.job }}</h3>
    <button @click="changeName">改变名字</button>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, triggerRef } from 'vue'

defineOptions({
  name: 'Person',
})

type person = {
  name: string;
  age: number;
  job: string;
}

/*
  shallowRef 浅层作用，常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。
*/
const person = shallowRef<person>({
  name: '张三',
  age: 18,
  job: '程序员',
})

const changeName = () => {
  // 页面不更新，但是通过开发者工具可以看到 name 的值改变了
  person.value.name = '李四'
  // 如果要强制让页面更新数据，那么需要引入 triggerRef()
  triggerRef(person)

  // 页面更新了
  // person.value = {
  //   name: '李四',
  //   age: 18,
  //   job: '程序员',
  // }
}
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
  margin: 0 10px;
}
</style>
