<template>
  <div class="page">
    <h2>汽车信息：一辆{{ car.brand }}车，价值{{ car.price }}万</h2>
    <button @click="changeBrand">修改汽车的品牌</button>
    <button @click="changePrice">修改汽车的价格</button>
    <button @click="changeCar">修改汽车</button>
    <br>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

defineOptions({
  name: 'Person',
})

/*
  1. 若需要一个基本类型的响应式数据，必须使用 ref；
  2. 若需要一个响应式对象，层级不深，ref、reactive 都可以；
  3. 若需要一个响应式对象，且层级较深，推荐使用 reactive；
*/
let car = reactive({
  brand: '奔驰',
  price: 100,
})
const sum = ref(0)

const changeBrand = () => {
  car.brand = '宝马'
}
const changePrice = () => {
  car.price += 10
}
const changeCar = () => {
  // car = reactive({brand: '丰田', price: 1}) // 失去响应式
  Object.assign(car, {brand: '丰田', price: 1}) // 可以更新
}
const changeSum = () => {
  sum.value += 1
}
</script>

<style lang="scss" scoped></style>
