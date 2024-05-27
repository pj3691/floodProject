<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- <Header/> -->
  <el-config-provider>
    <RouterView />
  </el-config-provider>
</template>

<style>
#app {
  height: 100vh;
}
* {
  overflow: visible;
}
</style>
