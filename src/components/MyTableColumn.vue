<template>
  <!-- TODO: el-table-column 兼容插槽写法 -->
  <!-- https://juejin.cn/post/7301569815827103755 -->
  <!-- https://github.com/HalseySpicy/Geeker-Admin/blob/master/src/components/ProTable/index.vue -->
  <!-- 掘金手册，函数式组件写法 render -->
  <el-table-column v-for="column in newTableColumns" v-bind="(column as object)" />
</template>

<script setup lang="ts">
import { onBeforeUpdate, onMounted, ref } from 'vue'

type Mapper<T> = {
  [P in keyof T as string]?: string | object
}
// type Mapper2 = {
//   [key: string]: string | object
// }

const props = defineProps<{
  tableColumns: Mapper<any>
}>()

const newTableColumns = ref({})
const handleNewTableColumns = () => {
  newTableColumns.value = { ...props.tableColumns }
  const rawAttrs = props.tableColumns
  for (const k in rawAttrs) {
    const rawVal = rawAttrs[k]

    if (typeof rawVal === 'string') {
      Reflect.set(newTableColumns.value, k, {
        key: k,
        prop: k,
        label: rawVal,
      })
    }

    if (typeof rawVal === 'object') {
      // 设置默认的 key
      if (!Reflect.has(rawVal, 'key')) {
        Reflect.set(rawVal, 'key', k)
      }
      if (!Reflect.has(rawVal, 'label')) {
        Reflect.set(rawVal, 'label', k)
      }

      // 设置默认的 prop，如果该列是多选项，则不需要 prop
      if (!Reflect.has(rawVal, 'prop') && !(Reflect.has(rawVal, 'type') && Reflect.get(rawVal, 'type') === 'selection')) {
        Reflect.set(rawVal, 'prop', k)
      }
    }
  }
}

onMounted(handleNewTableColumns)
onBeforeUpdate(handleNewTableColumns)
</script>

<style scoped></style>
