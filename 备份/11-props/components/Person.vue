<template>
  <div class="page">
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Persons } from '@/types'

defineOptions({
  name: 'Person',
})

// 限制类型 + 限制必要性 + 定义默认值
withDefaults(defineProps<{
  list?: Persons // 控制必要性
}>(), {
  list: () => [{id: '00', name: '牛奶', age: 19}], // 默认值
})
</script>
