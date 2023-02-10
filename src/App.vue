<script lang="ts">
/// <reference types="vite-svg-loader" />
import IconComponent from "./assets/headerIcon.svg?component";
export default {
   components: {
      IconComponent,
   },
};
</script>

<template>
   <RouterLink to="/">
      <header>
         <IconComponent width="50" height="50" />
         <strong>PokeList</strong>
      </header>
   </RouterLink>

   <RouterView />
</template>

<style scoped>
header {
   width: 100%;
   margin: 0 auto;
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 1rem;
}

strong {
   font-size: large;
   font-weight: 700;
   color: white;
}
</style>
