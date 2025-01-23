<template>
  <div class="page">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" min-width="180" />
      <el-table-column prop="age" label="年龄" min-width="180" />
      <el-table-column prop="date" label="出生日期" min-width="180" />
      <el-table-column prop="address" label="住宅地址" min-width="180" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button type="primary" size="small" @click="showDialog = true">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <DialogEdit v-model="showDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DialogEdit from '@/components/DialogEdit.vue'

export interface TableData {
  date: string
  name: string
  age: number
  address: string
}
const tableData = ref<TableData[]>([
  {
    date: '2007-01-23',
    name: '张三',
    age: 18,
    address: '广州路1号店',
  },
  {
    date: '2005-11-23',
    name: '李四',
    age: 20,
    address: '广州路2号店',
  },
  {
    date: '2004-02-23',
    name: '王五',
    age: 21,
    address: '广州路3号店',
  },
])

const showDialog = ref(false)
</script>

<style lang="scss" scoped></style>
