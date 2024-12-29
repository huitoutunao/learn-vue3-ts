<template>
  <!-- 查询表单 -->
  <SearchForm
    v-if="isShowSearch"
    :columns="_searchColumns"
    :search-param="searchParam"
    :search="search"
    :reset="reset"
  />

  <!-- 表格内容 -->
  <div class="basic-table">
    <div class="table-header">
      <div class="header-button-left">
        <slot
          name="tableHeader"
          :selected-list-ids="selectedListIds"
          :selected-list="selectedList"
          :is-selected="isSelected"
        ></slot>
      </div>
      <div v-if="toolButton" class="header-button-right">
        <slot name="toolButton"></slot>
      </div>
    </div>
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="data ?? tableData"
      :border="border"
      :row-key="rowKey"
      @selection-change="selectionChange"
    >
      <!-- 默认插槽 -->
      <slot></slot>
      <template v-for="item in tableColumns" :key="item">
        <!-- selection || index || expand -->
        <el-table-column
          v-if="item.type && ['selection', 'index', 'expand'].includes(item.type)"
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
          :selectable="selectable"
        >
          <template v-if="item.type === 'expand'" #default="scope">
            <component :is="item.render" v-if="item.render" v-bind="scope"></component>
            <slot v-else :name="item.type" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <!-- other -->
        <el-table-column v-else v-bind="item" :align="item.align ?? 'center'">
          <template #default="scope">
            <component :is="item.render" v-if="item.render" v-bind="scope"></component>
            <!-- <RenderComponent v-if="item.render" :render="item.render" :scope="scope" /> -->
          </template>
          <template #header="scope">
            <component :is="item.headerRender" v-if="item.headerRender" v-bind="scope"></component>
          </template>
        </el-table-column>
      </template>
      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append"></slot>
      </template>
      <!-- 无数据 -->
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot name="pagination">
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
      />
    </slot>
  </div>
</template>

<script setup>
import { onMounted, provide, ref, watch } from 'vue'
import useTable from '@/hooks/useTable'
import useSelection from '@/hooks/useSelection'
import Pagination from '@/components/Pagination.vue'
import SearchForm from '@/components/SearchForm.vue'
// import RenderComponent from '@/components/render'

defineOptions({
  name: 'BasicTable',
  inheritAttrs: false,
})

const props = defineProps({
  /* 是否显示搜索表单 */
  isShowSearch: { type: Boolean, default: true },
  /* 搜索表单项 */
  searchColumns: { type: Array, default: () => [] },
  /* 表格数据 */
  data: { type: [Array, null], default: null },
  /* 表格列 */
  columns: { type: Array, default: () => [] },
  /* 表格边框 */
  border: { type: Boolean, default: true },
  /* 表格行 key */
  rowKey: { type: String, default: 'id' },
  /* 表格工具栏按钮 */
  toolButton: { type: Boolean, default: false },
  /* 是否禁用多选 */
  selectDisable: { type: Boolean, default: false },
  /* 是否显示分页 */
  pagination: { type: Boolean, default: true },
  /* 请求分页参数映射 */
  pageParamKeyMap: { type: Object, default: () => ({ pageNum: 'page', pageSize: 'rows' }) },
  /* 是否自动请求数据 */
  requestAuto: { type: Boolean, default: true },
  /* 请求方法 */
  requestApi: { type: Function, default: () => {} },
  /* 初始化参数 */
  initParam: { type: Object, default: () => ({}) },
  /* 请求数据回调 */
  dataCallback: { type: Function, default: () => {} },
  /* 请求错误回调 */
  requestError: { type: Function, default: () => {} },
})

/* 表格 DOM 元素 */
const tableRef = ref()

/* 接收 columns 并设置为响应式 */
const tableColumns = ref(props.columns)

/* 接收 searchColumns 并设置为响应式 */
const _searchColumns = ref(props.searchColumns)

/* 表格多选 Hooks */
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey)

/* 表格操作 Hooks */
const { tableData, pageable, getTableList, searchParam, searchInitParam, handleSizeChange, handleCurrentChange, search, reset } = useTable(
  props.requestApi,
  props.initParam,
  props.pageParamKeyMap,
  props.pagination,
  props.dataCallback,
  props.requestError
)

/* 定义 enumMap 存储 enum 值 */
const enumMap = ref(new Map())
provide('enumMap', enumMap)
const setEnumMap = async (col) => {
  if (!col.formItem.enum) return
  /* 如果当前 enum 为平台数据需要请求数据，则调用该请求接口，并存储到 enumMap */
  if (typeof col.formItem.enum !== 'function') return enumMap.value.set(col.formItem.prop, col.formItem.enum)
  const { data } = await col.enum()
  enumMap.value.set(col.formItem.prop, data)
}
_searchColumns.value.forEach(async (col) => { setEnumMap(col) })

/* 设置搜索表单排序默认值 && 设置搜索表单项的默认值 */
_searchColumns.value.forEach((column, index) => {
  column.order = column.order ?? index + 2
  if (column.formItem?.defaultValue !== undefined && column.formItem?.defaultValue !== null) {
    searchInitParam.value[column.key] = column.formItem?.defaultValue
    searchParam.value[column.key] = column.formItem?.defaultValue
  }
})

/* 排序搜索表单项 */
_searchColumns.value.sort((a, b) => a.order - b.order)

/* 清空选中数据列表 */
const clearSelection = () => tableRef.value.clearSelection()

const selectable = () => {
  return !props.selectDisable
}

/* 初始化请求 */
onMounted(() => props.requestAuto && getTableList())

/* 监听页面 initParam 改化，重新获取表格数据 */
watch(() => props.initParam, getTableList, { deep: true })

/* 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去) */
defineExpose({
  element: tableRef,
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  handleSizeChange,
  handleCurrentChange,
  clearSelection,
  enumMap,
  isSelected,
  selectedList,
  selectedListIds,
})
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-table) {
  margin-top: 10px;
}
</style>
