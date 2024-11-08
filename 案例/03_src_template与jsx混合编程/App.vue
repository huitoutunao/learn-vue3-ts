<template>
  <div class="page">
    <div>App</div>
    <Demo :msg="msg" />
    <el-button @click="changeMsg">按钮</el-button>
    <Counter v-model:count="count" />
  </div>
</template>

<script setup lang="tsx">
import { defineComponent, ref, useCssModule } from 'vue'
import Counter from '@/components/counter.vue'

const styles = useCssModule()
const msg = ref('hello world')
const count = ref(0)
const changeMsg = () => {
  msg.value = 'hello vue3'
}

const Demo = defineComponent({
  name: 'Demo',
  props: {
    msg: String,
  },
  setup(props) {
    return () => (
      <div class={styles.wrapper}>
        <div class="box">msg：{props.msg}</div>
        <el-card style="max-width: 480px">
          {
            Array(5).fill(5).map((item, index) => {
              return (
                <p key={index}>{ 'List item ' + item }</p>
              )
            })
          }
        </el-card>
      </div>
    )
  },
})
</script>

<style module>
.wrapper {
  margin: 10px 0;
}
</style>
