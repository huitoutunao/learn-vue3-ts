<template>
  <div class="page">
    <BasicTable
      :columns="columns"
      :init-param="initParam"
      :request-api="apiGetOilDepotList"
      :request-error="requestError"
      :data-callback="dataCallback"
      stripe
      style="width: 100%"
    >
      <template #tableHeader="scope">
        <el-button type="primary" @click="onAdd(scope)">新增</el-button>
        <el-button type="success">下载</el-button>
        <el-button type="default">批量导入</el-button>
      </template>
    </BasicTable>
    <!-- <BasicTable :data="tableData" :columns="columns" stripe style="width: 100%" /> -->
    <!-- <BasicTable :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date" min-width="180" />
      <el-table-column prop="name" label="Name" min-width="180" />
      <el-table-column prop="address" label="Address" min-width="180" />
      <el-table-column prop="action" label="操作" fixed="right" width="120">
        <template #default="scope">
          <el-button type="primary" @click="() => console.log(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </BasicTable> -->
  </div>
</template>

<script setup>
import { h } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import BasicTable from '@/components/BasicTable.vue'

defineOptions({
  name: 'BasicTableDemo',
})

const apiGetOilDepotList = () => {}

const initParam = {
  oilDepotName: '',
}
const requestError = (err) => {
  console.log('@@err', err)
}
const dataCallback = (res) => {
  console.log('@@res', res)
  let resData = {
    list: [],
    total: 0,
  }
  if (res.status === 0) {
    if (res.data) {
      resData.list = res.data
      resData.total = res.totalRecords
    }
  } else {
    ElMessage.error(res.info)
  }

  return resData
}

/* 新增 */
const onAdd = (scope) => {
  console.log(scope)
}

/* 列设置 */
const columns = [
  {
    prop: 'oilDepotName',
    label: '油库名称',
    minWidth: 180,
  },
  {
    prop: 'realNinetyTwo',
    label: '92#实时库存',
    minWidth: 180,
  },
  {
    prop: 'realNinetyFive',
    label: '95#实时库存',
    minWidth: 180,
  },
  {
    prop: 'action',
    label: '操作',
    fixed: 'right',
    minWidth: 180,
    render: (scope) => {
      return h(ElButton, { type: 'primary', onClick: () => console.log(scope.row) }, () => '查看')
    },
    /* render: (scope) => {
      return (
        <el-button type="primary" onClick={() => console.log(scope.row)}>
          查看
        </el-button>
      )
    }, */
  },
]
</script>

<style lang="scss" scoped></style>
