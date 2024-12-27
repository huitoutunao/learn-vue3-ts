<template>
  <div class="basic-search-form">
    <el-form ref="formRef" :model="searchParam">
      <el-row :gutter="10">
        <template v-for="item in _columns" :key="item.key">
          <el-col v-show="item.isShow" :span="item.colSpan">
            <el-form-item :label="item.formItem.label" :prop="item.formItem.prop">
              <SearchFormItem :column="item" :search-param="searchParam" />
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="actionSpan" class="el-col-wrapper">
          <el-form-item class="btn-group-item flex-end">
            <el-button-group>
              <el-button type="default" :icon="RefreshLeft">重置</el-button>
              <el-button type="primary" :icon="Search">查询</el-button>
              <el-button
                v-if="showCollapse"
                type="default"
                :plain="true"
                @click="_collapsed = !_collapsed"
              >
                {{ _collapsed ? '展开' : '收起' }}
                <el-icon class="el-icon--right">
                  <component :is="_collapsed ? ArrowDown : ArrowUp"></component>
                </el-icon>
              </el-button>
            </el-button-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RefreshLeft, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import SearchFormItem from './SearchFormItem.vue'

defineOptions({
  name: 'SearchForm',
  inheritAttrs: false,
})

const props = defineProps({
  /* 搜索项 */
  columns: {
    type: Array,
    default: () => [],
  },
  /* 搜索参数 */
  searchParam: {
    type: Object,
    default: () => ({}),
  },
  /* 响应式显示的列数 */
  cols: {
    type: Object,
    default: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  },
  /* 默认是否折叠 */
  collapsed: {
    type: Boolean,
    default: false,
  },
  /* 是否显示展开收起按钮 */
  showCollapse: {
    type: Boolean,
    default: true,
  },
  /* 折叠行数，仅支持1行 */
  collapsedRows: {
    type: Number,
    default: 1,
  },
})

/* 接收 collapsed */
const _collapsed = ref(props.collapsed)

/* 响应式断点 */
let breakPoint = ref('xl')

/* 响应式列 */
const _columns = computed(() => {
  const hiddenIndex = props.cols[breakPoint.value]
  const spanTotal = 24
  const spanEach = hiddenIndex + 1
  const spanCount = Math.floor(spanTotal / spanEach)
  return props.columns.map((item, index) => {
    const copy = { ...item }
    copy.colSpan = spanCount
    copy.isShow = _collapsed.value ? index < hiddenIndex : true
    return copy
  })
})

/* 响应式布局，计算右侧按钮组剩余的列数 */
const actionSpan = computed(() => {
  const total = _columns.value.reduce((pre, cur) => pre + (cur.isShow ? cur.colSpan : 0), 0)
  return 24 - (total % 24)
})

/* 监听屏幕变化 */
const resize = (e) => {
  let width = e.target.innerWidth
  switch (!!width) {
    case width < 768:
      breakPoint.value = 'xs'
      break
    case width >= 768 && width < 992:
      breakPoint.value = 'sm'
      break
    case width >= 992 && width < 1200:
      breakPoint.value = 'md'
      break
    case width >= 1200 && width < 1920:
      breakPoint.value = 'lg'
      break
    case width >= 1920:
      breakPoint.value = 'xl'
      break
    default:
      breakPoint.value = 'xl'
      break
  }
}

onMounted(() => {
  resize({ target: { innerWidth: window.innerWidth } })
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<style lang="scss" scoped>
.el-col-wrapper {
  display: flex;

  .btn-group-item {
    flex: 1;
    display: flex;

    :deep(.el-form-item__content) {
      flex: 1;
      display: flex;
      align-items: center;
    }

    &.flex-end {
      :deep(.el-form-item__content) {
        justify-content: flex-end;
      }
    }
  }
}
</style>
