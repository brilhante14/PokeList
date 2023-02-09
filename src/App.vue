<script lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <strong>PokeList</strong>
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

strong {
  font-size: large;
  font-weight: 700;
  color: white;
}
</style>
