<template>
  <div ref="pageRef" class="page">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>{{ getAge }}</h2>
    <h2>{{ job }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, toRef } from 'vue'

defineOptions({
  name: 'Person',
})

/*
  toRef 可以将值、refs 或 getters 规范化，也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。这个函数在你想把一个 prop 的 ref 传递给一个组合式函数时会很有用。

  toRefs 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的。
*/

type Person = {
  name: string;
  age: number;
  job?: string | undefined;
}
const person = reactive<Person>({
  name: '张三',
  age: 18,
})
// let { name, age } = toRefs(person)
let name = toRef(person, 'name')
let age = toRef(person, 'age')
let job = toRef(person, 'job', 'teacher') // 可以设置默认值
const getAge = toRef(() => age.value + 10)

const demo = ref('word')
const getDemo = toRef(demo)
console.log(getDemo.value)

const changeName = () => {
  name.value += '~'
}
const changeAge = () => {
  age.value += 1
}
</script>
