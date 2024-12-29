<template>
  <div class="page">
    <BasicTable
      ref="basicTableRef"
      :search-columns="searchColumns"
      :columns="columns"
      :init-param="initParam"
      :request-api="apiGetOilDepotList"
      :request-error="requestError"
      :data-callback="dataCallback"
      stripe
      style="width: 100%"
    >
      <template #tableHeader="scope">
        <el-button-group>
          <el-button type="primary" :icon="Plus" @click="onAdd(scope)">新增</el-button>
          <el-button type="success" :icon="Document">下载模板</el-button>
          <el-button type="default" :icon="Upload">导入</el-button>
        </el-button-group>
      </template>
    </BasicTable>
  </div>
</template>

<script setup>
import axios from 'axios'
import { h, onMounted, ref, nextTick } from 'vue'
import { ElButton, ElDatePicker, ElMessage } from 'element-plus'
import { Plus, Document, Upload } from '@element-plus/icons-vue'
import BasicTable from '@/components/BasicTable.vue'

defineOptions({
  name: 'BasicTableDemo',
})

const apiGetOilDepotList = () => {}
const initParam = {}
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

const basicTableRef = ref(null)
const searchColumns = ref([
  {
    key: 'shopNo',
    formItem: {
      el: 'input',
      label: '商铺号',
      prop: 'shopNo',
      defaultValue: '666',
      elProps: {
        placeholder: '请输入',
      },
    },
  },
  {
    key: 'orderNo',
    formItem: {
      el: 'input',
      label: '订单号',
      prop: 'orderNo',
      elProps: {
        placeholder: '请输入',
      },
    },
  },
  {
    key: 'goodsName',
    formItem: {
      el: 'input',
      label: '商品名称',
      prop: 'goodsName',
      elProps: {
        placeholder: '请输入',
      },
    },
  },
  {
    key: 'goodsDate',
    formItem: {
      el: 'date-picker',
      label: '商品过期',
      prop: 'goodsDate',
      elProps: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        style: { width: '100%' },
      },
    },
  },
  {
    key: 'goodsType',
    fieldNames: { label: 'typeLabel', value: 'typeValue' },
    formItem: {
      el: 'select',
      label: '商品种类',
      prop: 'goodsType',
      elProps: {
        placeholder: '请选择',
      },
    },
  },
  {
    key: 'orderType',
    formItem: {
      el: 'select',
      // 字典请求不带参数
      // enum: getData,
      // 字典请求携带参数
      // enum: () => getData({ id: 1 }),
      enum: [
        { label: '类型1', value: 'o1' },
        { label: '类型2', value: 'o2' },
      ],
      label: '订单类型',
      prop: 'orderType',
      elProps: {
        placeholder: '请选择',
      },
    },
  },
  {
    key: 'goodsDateTimerange',
    formItem: {
      label: '商品周期',
      prop: 'goodsDateTimerange',
      render: ({ searchParam }) => {
        return h(ElDatePicker, {
          modelValue: searchParam.goodsDateTimerange, // v-model 的 prop
          'onUpdate:modelValue': (val) => { searchParam.goodsDateTimerange = val }, // v-model 的事件监听
          type: 'datetimerange',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          style: { width: '100%' },
          onChange: (val) => {
            console.log('查询参数', searchParam)
            console.log('日期范围变化', val)
          },
        })
      },
    },
  },
  {
    key: 'cascaderType',
    fieldNames: { label: 'label', value: 'value' },
    formItem: {
      el: 'cascader',
      label: '级联类型',
      prop: 'cascaderType',
      elProps: {
        placeholder: '请选择',
        style: { width: '100%' },
      },
    },
  },
])

nextTick(() => {
  setTimeout(() => {
    basicTableRef.value.enumMap.set('goodsType', [
      { typeLabel: '种类1', typeValue: 't1' },
      { typeLabel: '种类2', typeValue: 't2' },
    ])
    basicTableRef.value.enumMap.set('cascaderType', [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'consistency',
                label: 'Consistency',
              },
              {
                value: 'feedback',
                label: 'Feedback',
              },
              {
                value: 'efficiency',
                label: 'Efficiency',
              },
              {
                value: 'controllability',
                label: 'Controllability',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'side nav',
                label: 'Side Navigation',
              },
              {
                value: 'top nav',
                label: 'Top Navigation',
              },
            ],
          },
        ],
      },
    ])
  }, 2000)
})

onMounted(() => {
  axios.get('/mock/demo').then((res) => console.log(res))
})
</script>

<style lang="scss" scoped></style>
