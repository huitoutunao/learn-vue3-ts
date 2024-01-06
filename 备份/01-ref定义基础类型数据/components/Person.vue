<template>
  <div class="page">
    <h2>{{ name }}</h2>
    <h2>{{ age }}</h2>
    <h2>{{ address }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看电话</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Person',
})

const name = ref('张三')
const age = ref(18)
const tel = '13988888888'
const address = '广东省广州市'


const changeName = () => {
  name.value = 'zhang-san'
}
const changeAge = () => {
  age.value += 1
}
const showTel = () => {
  alert(tel)
}
</script>

<style lang="scss" scoped>

</style>
