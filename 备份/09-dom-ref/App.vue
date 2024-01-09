<template>
  <Person ref="personRef" />
  <button @click="getDom">按钮获取实例</button>
</template>

<script lang="ts">
import { ref } from 'vue'
import Person from '@/components/Person.vue'

export default {
  name: 'App',
  components: {
    Person,
  },
  setup() {
    const personRef = ref()
    const getDom = () => {
      console.log(personRef.value)
    }

    return {
      personRef,
      getDom,
    }
  },
}
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
