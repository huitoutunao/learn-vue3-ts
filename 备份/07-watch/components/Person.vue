<template>
  <div class="page">
    <h2>情况一：监视【ref】定义的【基本类型】数据</h2>
    <h3>当前求和值：{{ sum }}</h3>
    <button @click="changeSum">点我sum+1</button>
    <hr>
    <h2>情况二：监视【ref】定义的【对象类型】数据</h2>
    <h3>姓名：{{ person.name }}</h3>
    <h3>年龄：{{ person.age }}</h3>
    <button @click="changeName">改名字</button>
    <button @click="changeAge">改年龄</button>
    <button @click="changePerson">改整个人</button>
    <hr>
    <h2>情况三：监视【reactive】定义的【对象类型】数据</h2>
    <h3>姓名：{{ person3.name }}</h3>
    <h3>年龄：{{ person3.age }}</h3>
    <button @click="changeName3">改名字</button>
    <button @click="changeAge3">改年龄</button>
    <button @click="changePerson3">改整个人</button>
    <hr>
    <h2>情况四：监视【reactive】定义的【对象类型】的某个属性</h2>
    <h3>姓名：{{ person4.name }}</h3>
    <h3>年龄：{{ person4.age }}</h3>
    <h3>汽车1：{{ person4.car.car1 }}</h3>
    <h3>汽车2：{{ person4.car.car2 }}</h3>
    <button @click="changeName4">改名字</button>
    <button @click="changeAge4">改年龄</button>
    <button @click="changeCarf4">改第一辆车</button>
    <button @click="changeCars4">改第二辆车</button>
    <button @click="changeCar4">改整辆车</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'

defineOptions({
  name: 'Person',
})

// 情况一
const sum = ref(0)
const unwatch1 = watch(sum, (nVal, oVal) => {
  console.log(nVal, oVal)
  if (nVal > 10) {
    unwatch1()
  }
})
const changeSum = () => {
  sum.value += 1
}

/*
  情况二
  深度监听对象属性更改，deep = true
  立即监听对象的变化，immediate = true
*/
const person = ref({
  name: '张三',
  age: 18,
})
const changeName = () => {
  person.value.name += '~'
}
const changeAge = () => {
  person.value.age += 1
}
const changePerson = () => {
  person.value = {name: '李四', age: 50}
}
const unwatch2 = watch(person, (nVal, oVal) => {
  console.log('person', nVal, oVal)
}, {
  deep: true,
})

/*
  情况三
  监听 reactive 定义的对象类型，watch 默认开启深度监听 deep = true，且关闭不了
*/
const person3 = reactive({
  name: '张三',
  age: 18,
})
const changeName3 = () => {
  person3.name += '~'
}
const changeAge3 = () => {
  person3.age += 1
}
const changePerson3 = () => {
  Object.assign(person3, {name: '李四', age: 50})
}
const unwatch3 = watch(person3, (nVal, oVal) => {
  console.log('person3', nVal, oVal)
})

/*
  情况四
  监视响应式对象的某个属性，使用 getters 函数返回值处理
*/
const person4 = reactive({
  name: '张三',
  age: 18,
  car: {
    car1: '奔驰',
    car2: '宝马',
  },
})
const changeName4 = () => {
  person4.name += '~'
}
const changeAge4 = () => {
  person4.age += 1
}
const changeCarf4 = () => {
  person4.car.car1 = '奥迪'
}
const changeCars4 = () => {
  person4.car.car2 = '大众'
}
const changeCar4 = () => {
  person4.car = {car1: '比亚迪', car2: '吉利'}
}
/* watch(() => person4.name, (nVal, oVal) => {
  console.log('person4 name', nVal, oVal)
}) */

// 重点：这里可以直接写对象某个属性，也可以写 getters 函数返回值，推荐写 getters，配合 deep = true 深度监听响应式对象的某个属性
/* watch(() => person4.car, (nVal, oVal) => {
  console.log('person4 car', nVal, oVal)
}, {deep: true}) */

// 监听多个源
watch([() => person4.name, () => person4.car.car1], ([name, car1], [prevName, prevCar1]) => {
  console.log(name, prevName)
  console.log(car1, prevCar1)
}, {deep: true})
</script>
