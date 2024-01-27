<template>
  <div class="page">
    <MyInput ref="myInputRef" v-model="input" placeholder="请输入">
      <template #prefix>
        <el-icon class="el-input__icon"><Search /></el-icon>
      </template>
      <template #suffix>
        <el-icon class="el-input__icon"><Calendar /></el-icon>
      </template>
    </MyInput>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
import MyInput from '@/components/MyInput.vue'

const input = ref('')
const myInputRef = ref()

onMounted(() => {
  nextTick(() => {
    myInputRef.value.inputRef.focus()
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
