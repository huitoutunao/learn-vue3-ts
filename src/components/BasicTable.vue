<template>
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
      :max-height="maxHeight"
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
import { onMounted, ref, watch } from 'vue'
import useTable from '@/hooks/useTable'
import useSelection from '@/hooks/useSelection'
import Pagination from '@/components/Pagination.vue'
// import RenderComponent from '@/components/render'

defineOptions({
  name: 'BasicTable',
  inheritAttrs: false,
})

const props = defineProps({
  data: { type: [Array, null], default: null },
  columns: { type: Array, default: () => [] },
  maxHeight: { type: [String, Number], default: '450' },
  border: { type: Boolean, default: true },
  rowKey: { type: String, default: 'id' },
  toolButton: { type: Boolean, default: false },
  selectDisable: { type: Boolean, default: false },
  pagination: { type: Boolean, default: true },
  pageParamKeyMap: { type: Object, default: () => ({ pageNum: 'page', pageSize: 'rows' }) },
  requestAuto: { type: Boolean, default: true },
  requestApi: { type: Function, default: () => {} },
  initParam: { type: Object, default: () => ({}) },
  dataCallback: { type: Function, default: () => {} },
  requestError: { type: Function, default: () => {} },
})

/* 表格 DOM 元素 */
const tableRef = ref()

/* 接收 columns 并设置为响应式 */
const tableColumns = ref(props.columns)

/* 表格多选 Hooks */
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey)

/* 表格操作 Hooks */
const { tableData, pageable, getTableList, handleSizeChange, handleCurrentChange } = useTable(
  props.requestApi,
  props.initParam,
  props.pageParamKeyMap,
  props.pagination,
  props.dataCallback,
  props.requestError
)

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
  clearSelection,
  getTableList,
  handleSizeChange,
  handleCurrentChange,
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
