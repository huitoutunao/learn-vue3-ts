<template>
  <div class="basic-pagination">
    <el-pagination
      :background="true"
      :current-page="pageable.pageNum"
      :page-size="pageable.pageSize"
      :page-sizes="[10, 20, 30, 40, 50]"
      :total="pageable.total"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Pagination',
  inheritAttrs: false,
})
defineProps({
  pageable: {
    type: Object,
    required: true,
    default: () => ({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    }),
  },
  handleSizeChange: {
    type: Function,
    required: true,
    default: () => {},
  },
  handleCurrentChange: {
    type: Function,
    required: true,
    default: () => {},
  },
})
</script>

<style lang="scss" scoped>
.basic-pagination {
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
}
</style>
