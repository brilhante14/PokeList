import { defineStore } from "pinia";

export const usePokemonsStore = defineStore("pokemons", {
   state: () => ({
      pokemons: [] as { id: string; name: string; url: string }[],
   }),
   getters: {},
   actions: {
      setPokemons(pokemonsList: { name: string; url: string }[]) {
         this.pokemons = pokemonsList.map((pokemon) => ({
            ...pokemon,
            id: pokemon.url.split("/")[6],
         }));
      },
   },
});
