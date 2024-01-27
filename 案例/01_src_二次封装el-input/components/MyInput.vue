<template>
  <div>
    <el-input ref="inputRef" v-bind="$attrs">
      <template v-for="(slot, slotName) in $slots" #[slotName]="slotProps">
        <template v-if="slotProps">
          <slot :name="slotName" v-bind="slotProps"></slot>
        </template>
        <template v-else>
          <slot :name="slotName"></slot>
        </template>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { useAttrs, useSlots, ref } from 'vue'

const $attrs = useAttrs()
const $slots = useSlots()
const inputRef = ref()
console.log('@@', $slots)

/*
  父组件调用 ref
  <my-input ref="myInputRef"></my-input>

  const myInputRef = ref()
  myInputRef.value.inputRef.focus()
*/
defineExpose({
  inputRef,
})
</script>

<style lang="scss" scoped></style>
