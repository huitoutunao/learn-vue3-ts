<template>
  <Person :list="list" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { type Persons } from '@/types'
import Person from '@/components/Person.vue'

const list = reactive<Persons>([
  {id: '01', name: '张三1', age: 18},
  {id: '02', name: '张三2', age: 18},
  {id: '03', name: '张三3', age: 18, job: 'worker'},
])
</script>

<style>
.page {
  margin: 30px;
  padding: 20px;
  background-color: beige;
  border-radius: 4px;
  box-shadow: 0 0 10px;
}
</style>
