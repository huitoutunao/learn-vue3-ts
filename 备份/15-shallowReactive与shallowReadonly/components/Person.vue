<template>
  <div class="page">
    <h2>自我介绍</h2>
    <h3>姓名：{{ person.name }}</h3>
    <h3>年龄：{{ person.age }}</h3>
    <h3>职业：{{ person.job }}</h3>
    <h3>已拥有工具车：{{ person.car.car1 }}/{{ person.car.car2 }}</h3>
    <h3>已拥有手机：{{ myPhones.phones.phone1 }}/{{ myPhones.phones.phone2 }}</h3>
    <button @click="changeName">改变名字</button>
    <button @click="changeCar">改变工具车</button>
    <button @click="changePhone">改变手机</button>
  </div>
</template>

<script setup lang="ts">
import { isReactive, shallowReactive, shallowReadonly } from 'vue'

defineOptions({
  name: 'Person',
})

const person = shallowReactive({
  name: '张三',
  age: 18,
  job: '程序员',
  car: {
    car1: '雅迪',
    car2: '哈罗',
  },
})
const myPhones = shallowReadonly({
  phones: {
    phone1: '华为',
    phone2: '苹果',
  },
})
const changeName = () => {
  // 页面更新
  person.name = '李四'
}
const changeCar = () => {
  const res = isReactive(person.car.car1)
  console.log('是否 reactive', res)

  // 页面不更新，但是开发者工具的数据改变了
  person.car.car1 = '自行车'
}
const changePhone = () => {
  // 只读属性，直接修改根层级属性报错
  // myPhones.phones = {
  //   phone1: 'OPPO',
  //   phone2: 'vivo'
  // }

  // 由于只对根层级属性转换为只读，因此内部对象属性可以更改
  // 页面不会更新，浅层作用
  myPhones.phones.phone1 = 'OPPO'
}
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
  margin: 0 10px;
}
</style>
