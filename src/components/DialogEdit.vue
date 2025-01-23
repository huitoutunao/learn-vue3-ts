<template>
  <el-dialog
    :model-value="dialogVisible"
    title="标题"
    width="80%"
    @close="closeDialog"
  >
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="date">
            <el-input v-model="form.date" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="住宅地址" prop="address">
            <el-input v-model="form.address" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { TableData } from '@/App.vue'

type DialogFormData = {
  [K in keyof TableData]: TableData[K] | null
}

interface MyProps {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<MyProps>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
console.log(props.msg)
console.log(props.labels)

const dialogVisible = defineModel({ default: false })

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<DialogFormData>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '请输入出生日期', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '请输入住宅地址', trigger: 'blur' },
  ],
})

const form = reactive<DialogFormData>({
  name: null,
  age: null,
  date: null,
  address: null,
})

const onConfirm = () => {
  ruleFormRef.value?.validate((valid) => {
    return new Promise((resolve) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!')
      }
      resolve()
    })
  })
}

const closeDialog = () => {
  ruleFormRef.value?.resetFields()
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped></style>
