<template>
  <Person />
</template>

<script lang="ts">
import Person from './components/Person.vue'

export default {
  name: 'App',
  components: {
    Person,
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
