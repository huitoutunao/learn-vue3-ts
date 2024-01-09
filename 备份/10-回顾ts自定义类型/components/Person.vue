<template>
  <div class="page">
  </div>
</template>

<script setup lang="ts">
import { type PersonInter, type Persons } from '@/types'

defineOptions({
  name: 'Person',
})

// interface PersonInter {
//   id: string;
//   name: string;
//   age: number;
// }

const person: PersonInter = {
  id: '01',
  name: '张三',
  age: 18,
}
const list: Persons = [
  {id: '01',name: '张三1',age: 18},
  {id: '02',name: '张三2',age: 18},
  {id: '03',name: '张三3',age: 18},
]
</script>
