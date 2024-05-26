<template>
  <el-table :data="tableData" style="width: 100%">
    <template v-for="(slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </el-table>
</template>

<script setup lang="ts">
// type Mapper2 = {
//   [key: string]: string | object
// }

const props = defineProps<{
  tableData: Array<any>
}>()
</script>

<style lang="scss" scoped></style>
