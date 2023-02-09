<script lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <span>PokeList</span>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
