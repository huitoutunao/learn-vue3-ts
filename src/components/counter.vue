<template>
  <component :is="render()"></component>
</template>

<script setup lang="tsx">
const props = defineProps<{
  count: number
}>()

const emits = defineEmits(['update:count'])

const add = () => {
  emits('update:count', props.count + 1)
}
const render = () => {
  return (
    <div>
      <div class="content">count is {props.count}</div>
      <el-button type="primary" onClick={add}>加1</el-button>
    </div>
  )
}
</script>

<style scoped>
.content {
  color: #409eff;
}
</style>
