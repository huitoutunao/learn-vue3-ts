<template>
  <!-- TODO: el-table-column 兼容插槽写法 -->
  <!-- https://juejin.cn/post/7301569815827103755 -->
  <!-- https://github.com/HalseySpicy/Geeker-Admin/blob/master/src/components/ProTable/index.vue -->
  <!-- 掘金手册，函数式组件写法 render -->

  <!-- pnpm管理文章 https://juejin.cn/post/7357546247848198182?utm_source=gold_browser_extension -->
  <!-- pnpm monorepo 入门视频 https://www.bilibili.com/video/BV1e84y1B7s3/?spm_id_from=333.337.search-card.all.click  -->
  <el-table-column v-for="column in newTableColumns" v-bind="column">
    <template v-if="column?.defaultSlot">
      <TableRender />
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { onBeforeUpdate, onMounted, ref } from 'vue'
import TableRender from './table-render'

// type Mapper<T> = {
//   [P in keyof T as string]?: string | object
// }
type Mapper2 = {
  [key: string]: any
}

const props = defineProps<{
  tableColumns: Mapper2
}>()

export interface ItemTableColumns<T> {
  defaultSlot?: any;
  [key: string]: T | ItemTableColumns<T>;
}
type ItemTableColumnsObject = ItemTableColumns<any>

const newTableColumns = ref<ItemTableColumnsObject>({})
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
