<template>
  <div class="page">
    <MyTable v-loading="loading" :tableData="tableData">
      <MyTableColumn :tableColumns="tableColumnsMapper" />
    </MyTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MyTable from '@/components/MyTable.vue'
import MyTableColumn from '@/components/MyTableColumn.vue'

const loading = ref(false)
const tableData = ref([])
const tableColumnsMapper = {
  a: {
    label: '列a',
    width: '300',
  },
  b: '列b',
  c: '列c',
  d: '列d',
  e: '列e',
  f: '列f',
  g: '列g',
}

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = {
        data: new Array(9).fill({
          a: 'a111',
          b: 'b111',
          c: 'c111',
          d: 'd111',
          e: 'e111',
          f: 'f111',
          g: 'g111',
        })
      }

      return resolve(res)
    }, 1500)
  })
}

onMounted(() => {
  loading.value = true
  getData()
    .then((res: any) => {
      tableData.value = res.data
    }).finally(() => {
      loading.value = false
    })
})
</script>

<style>
.page {
  margin: 30px;
  padding: 20px;
  background-color: beige;
  border-radius: 4px;
  box-shadow: 0 0 10px;
}
</style>
