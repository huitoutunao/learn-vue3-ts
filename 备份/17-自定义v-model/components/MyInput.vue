<template>
  <div class="my-input">
    <input type="text" :value="modelValue" @input="changeInput">
  </div>
</template>

<script setup lang="ts">
defineProps(['modelValue'])

const emits = defineEmits(['update:model-value'])

const changeInput = (e: any) => {
  emits('update:model-value', (e.target as HTMLInputElement ).value)
}
</script>
