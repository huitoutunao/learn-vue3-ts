<template>
  <el-table :data="tableData" style="width: 100%">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </el-table>
</template>

<script setup lang="ts">
const props = defineProps<{
  tableData: Array<any>
}>()
</script>

<style lang="scss" scoped></style>
