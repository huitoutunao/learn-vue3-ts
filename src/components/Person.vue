<template>
  <div class="page">
    <div>{{ name }}</div>
    <div>{{ age }}</div>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看电话</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Person',
  setup() {
    let name = ref('张三')
    let age = ref(18)
    const tel = '13988888888'

    const changeName = () => {
      name.value = 'zhang-san'
    }
    const changeAge = () => {
      age.value += 1
    }
    const showTel = () => {
      alert(tel)
    }

    return {
      name,
      age,

      changeName,
      changeAge,
      showTel,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
