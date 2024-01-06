<template>
  <div class="page">
    <h2>汽车信息：一辆{{ car.brand }}车，价值{{ car.price }}万</h2>
    <button @click="changePrice">修改汽车的价格</button>
    <br>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <button @click="changeFirstGame">修改第一个游戏的名字</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Person',
})

const car = ref({
  brand: '奔驰',
  price: 100,
})
const games = ref([
  {id: 'game01', name: '王者荣耀'},
  {id: 'game02', name: '原神'},
  {id: 'game03', name: '三国志'},
])

const changePrice = () => {
  car.value.price += 10
}
const changeFirstGame = () => {
  games.value[0].name = '英雄联盟'
}
</script>

<style lang="scss" scoped>

</style>
