<script lang="ts">
import { usePokemonsStore } from '@/stores/pokemons';
import axios from 'axios';
import TheWelcome from '../components/TheWelcome.vue'

export default {
  name: "App",
  setup() {
    const store = usePokemonsStore();

    return {
      store,
    };
  },
  components: {},
  data: () => ({}),
  mounted() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=60").then((response) => {
      this.store.setPokemons(response.data.results);
    });
  },
};
</script>

<template>
  <main>
    <RouterLink to="/" v-for="pokemon in store.pokemons" :key="pokemon.name">
      <div class="card">
        {{ pokemon.name + "... " }}
      </div>
    </RouterLink>
  </main>
</template>

<style scoped>
main {
  line-height: 1.5;
  max-height: 100vh;
  display: grid;
  grid-template: "auto auto auto auto";
  align-items: stretch;
  justify-items: center;
  gap: 6rem;
  margin: 6rem auto 0;
  width: 1200px;
}

.card {
  height: 265px;
  width: 205px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: red;
}
</style>
