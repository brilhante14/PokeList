<script lang="ts">
import { usePokemonsStore } from "@/stores/pokemons";
import axios from "axios";

interface IPokemonInfo {
   name: string;
   url: string;
   id: string;
}

interface IEvolutionDictionary {
   [level: number]: IPokemonInfo[];
}

export default {
   setup() {
      const store = usePokemonsStore();

      return {
         store,
      };
   },
   data: () => ({
      search: "",
      evolutionDictionary: {} as IEvolutionDictionary,
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
      getEvolutions(id: string) {
         this.search = "";
         this.evolutionDictionary = {};

         axios
            .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then((speciesResponse) => {
               axios
                  .get(speciesResponse.data.evolution_chain.url)
                  .then((evolutionChainResponse) => {
                     let chain = evolutionChainResponse.data.chain;
                     let level = 0;

                     this.evolutionDictionary[level] = [
                        { ...chain.species, id: this.getId(chain.species.url) },
                     ];

                     while (chain.evolves_to.length) {
                        level++;
                        this.evolutionDictionary[level] = [];
                        chain.evolves_to.forEach((evolution: any) => {
                           this.evolutionDictionary[level].push({
                              ...evolution.species,
                              id: this.getId(evolution.species.url),
                           });
                        });
                        chain = chain.evolves_to[0];
                     }
                  });
            });
      },
   },
};
</script>

<template>
   <main>
      <div class="searchBar">
         <input placeholder="Digite sua busca" v-model="search" />
         <Transition>
            <div v-if="search" class="pokemonSearchContainer">
               <div
                  v-for="pokemon in store.pokemons
                     .filter((pokemon) =>
                        pokemon.name.includes(search.toLowerCase())
                     )
                     .slice(0, 10)"
                  :key="pokemon.name"
               >
                  <div
                     class="pokemonSearchCard"
                     @click="getEvolutions(pokemon.id)"
                  >
                     <img
                        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
                        :alt="pokemon.name"
                     />
                     {{ formatName(pokemon.name) }}
                  </div>
               </div>
            </div>
         </Transition>
      </div>

      <div
         v-for="evolutionLevel in Object.keys(evolutionDictionary)"
         :key="evolutionLevel"
         class="pokemonEvolutionContainer"
      >
         <RouterLink
            :to="`/pokemon/${pokemon.id}`"
            v-for="pokemon in evolutionDictionary[evolutionLevel as unknown as keyof IEvolutionDictionary]"
            :key="pokemon.id"
         >
            <div class="pokemonEvolutionCard">
               <img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
                  :alt="pokemon.name"
               />
               {{ formatName(pokemon.name) }}
               <EvolutionCards :evolutionChain="pokemon" />
            </div>
         </RouterLink>
      </div>
   </main>
</template>

<style scoped>
main {
   display: flex;
   flex-direction: column;
   align-items: center;
}

.searchBar {
   position: relative;
}

.pokemonSearchContainer {
   position: absolute;
   top: 100%;

   max-height: 300px;
   border-radius: 8px;
   margin-top: 0.2rem;

   overflow-y: auto;
   overflow-x: hidden;
   z-index: 1;
}

.pokemonSearchCard {
   height: 100px;
   cursor: pointer;
   width: 500px;
   margin-bottom: 0.2rem;
   display: flex;
   align-items: center;
   justify-content: center;

   color: antiquewhite;
   background: linear-gradient(to top, #36d1dc, #5b86e5);
}

.pokemonEvolutionContainer {
   display: flex;
   margin-top: 2rem;
   gap: 1.5rem;
}

.pokemonEvolutionCard {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   background-color: rgba(255, 255, 255, 0.2);
   border-radius: 8px;
}

input {
   width: 500px;
   margin-top: 2rem;
   outline: none;
   border-radius: 8px;
   height: 37px;
}

.v-enter-active,
.v-leave-active {
   transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
   opacity: 0;
}

@media (max-width: 850px) {
   .pokemonEvolutionContainer {
      max-width: 600px;
      padding: 1rem;
      overflow: auto;
   }
}

@media (max-width: 600px) {
   input {
      width: 300px;
   }

   .pokemonSearchCard {
      width: 300px;
      border-radius: 8px;
   }

   .pokemonEvolutionContainer {
      max-width: 300px;
      padding: 0.25rem;
      overflow: auto;
   }
}
</style>
