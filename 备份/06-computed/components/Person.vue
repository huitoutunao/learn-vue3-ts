<template>
  <div class="page">
    姓：<input type="text" v-model="firstName"><br>
    名：<input type="text" v-model="lastName"><br>
    全名：<span>{{ fullName }}</span><br>
    <button @click="changeFullName">改变全名：li-si</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'Person',
})

const firstName = ref('zhang')
const lastName = ref('san')

// fullName 只读
/* const fullName = computed(() => {
  return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
}) */

// 可读可写
const fullName = computed({
  get() {
    return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
  },
  set(v) {
    const str = v.split('-')
    firstName.value = str[0]
    lastName.value = str[1]
  },
})

const changeFullName = () => {
  fullName.value = 'li-si'
}
</script>
