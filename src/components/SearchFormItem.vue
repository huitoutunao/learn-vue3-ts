<template>
  <component
    :is="column.formItem?.render ?? `el-${column.formItem?.el}`"
    v-bind="{ ...handleSearchProps, ...placeholder, searchParam: _searchParam, clearable }"
    v-model="_searchParam[column.formItem.prop]"
    :data="column.formItem?.el === 'tree-select' ? columnEnum : []"
    :options="['cascader', 'select-v2'].includes(column.formItem?.el) ? columnEnum : []"
  >
    <template v-if="column.formItem?.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column.formItem?.el === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></component>
    </template>
  </component>
</template>

<script setup>
import { computed, inject, ref } from 'vue'

defineOptions({
  name: 'SearchFormItem',
  inheritAttrs: false,
})

const props = defineProps({
  column: {
    type: Object,
    default: () => ({}),
  },
  searchParam: {
    type: Object,
    default: () => ({}),
  },
})

/* 接收 searchParam */
const _searchParam = computed(() => props.searchParam)

/* 判断 fieldNames 设置 label && value && children 的 key 值 */
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? 'label',
    value: props.column.fieldNames?.value ?? 'value',
    children: props.column.fieldNames?.children ?? 'children',
  }
})

/* 接收 enumMap (el 为 select-v2 需单独处理 enumData) */
let enumMap = inject('enumMap', ref(new Map()))
const columnEnum = computed(() => {
  const enumData = enumMap.value.get(props.column.formItem.prop)
  if (!enumData) return []
  if (props.column.formItem?.el === 'select-v2' && props.column.fieldNames) {
    enumData = enumData.map((item) => {
      return { ...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value] };
    });
  }
  return enumData
})

/* 处理透传的 searchProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children) */
const handleSearchProps = computed(() => {
  const label = fieldNames.value.label
  const value = fieldNames.value.value
  const children = fieldNames.value.children
  const searchEl = props.column.formItem?.el
  let searchProps = props.column.formItem?.elProps ?? {}
  if (searchEl === 'tree-select') {
    searchProps = { ...searchProps, props: { ...searchProps.props, label, children }, nodeKey: value }
  }
  if (searchEl === 'cascader') {
    searchProps = { ...searchProps, props: { ...searchProps.props, label, value, children } }
  }
  return searchProps
})

/* 处理默认 placeholder */
const placeholder = computed(() => {
  const searchFormItem = props.column.formItem
  if (
    ['datetimerange', 'daterange', 'monthrange'].includes(searchFormItem?.elProps?.type) ||
    searchFormItem?.elProps?.isRange
  ) {
    return { rangeSeparator: '至', startPlaceholder: '开始时间', endPlaceholder: '结束时间' }
  }
  const _placeholder =
    searchFormItem?.elProps?.placeholder ??
    (searchFormItem?.el?.includes('input') ? '请输入' : '请选择')
  return { _placeholder }
})

/* 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示) */
const clearable = computed(() => {
  const searchFormItem = props.column.formItem
  return (
    searchFormItem?.elProps?.clearable ??
    (searchFormItem?.elProps?.defaultValue === null ||
      searchFormItem?.elProps?.defaultValue === undefined)
  )
})
</script>

<style lang="scss" scoped></style>
