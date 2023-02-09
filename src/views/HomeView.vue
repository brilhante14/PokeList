<script lang="ts">
import { usePokemonsStore } from '@/stores/pokemons';
import axios from 'axios';
import TheWelcome from '../components/TheWelcome.vue'

interface IPokemonInfo {
  name: string;
  url: string;
  id: string;
}

export default {
  name: "App",
  setup() {
    const store = usePokemonsStore();

    return {
      store,
    };
  },
  components: {},
  data: () => ({
    search: "",
    evolutionChain: [] as IPokemonInfo[],
  }),
  mounted() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=900")
      .then((response) => {
        this.store.setPokemons(response.data.results);
      });
  },
  methods: {
    formatName(name: string) {
      return name.charAt(0).toUpperCase() + name.substring(1);
    },
    getId(url: string) {
      return url.split("/")[6];
    },
  },
};
</script>

<template>
  <main>
    <input placeholder="Digite sua busca" v-model="search" />
    <Transition>
      <div v-if="search" class="pokemonSearchContainer">
        <div v-for="pokemon in store.pokemons.filter((pokemon) =>
          pokemon.name.includes(search)
        ).slice(0, 10)" :key="pokemon.name">
          <RouterLink to="/">
            <div class="pokemonSearchCard">
              <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
                :alt="pokemon.name" />
              {{ formatName(pokemon.name) }}
            </div>
          </RouterLink>
        </div>
      </div>
    </Transition>

  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemonSearchContainer {
  margin-top: 0.2rem;
  height: 280px;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
}

.pokemonGrid {
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.card {
  height: 100px;
  width: 1000px;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(184, 69, 117);
}

form {
  display: flex;
  flex-direction: column;
}

input {
  width: 1000px;
  margin-top: 2rem;
  outline: none;
  border-radius: 8px;
  height: 37px;
}
</style>
