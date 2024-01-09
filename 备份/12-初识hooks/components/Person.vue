<template>
  <div class="page">
    <h2>当前求和为 {{ sum }}</h2>
    <button @click="changeSum">点我+1</button>
    <hr>
    <img v-for="(image, index) in dogList" :key="index" :src="image" alt="img" />
    <br>
    <button @click="changeImg">获取图片</button>
  </div>
</template>

<script setup lang="ts">
import useSum from '@/hooks/useSum'
import useDog from '@/hooks/useDog'

defineOptions({
  name: 'Person',
})

const {sum, changeSum} = useSum()
const {dogList, changeImg} = useDog()
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
  margin: 0 10px;
}
</style>
