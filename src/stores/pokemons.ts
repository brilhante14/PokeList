import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const usePokemonsStore = defineStore("pokemons", {
  state: () => ({
    pokemons: [] as { name: string; url: string }[],
  }),
  getters: {
    //   finishedTodos(state) {
    //     // autocompletion! ✨
    //     return state.todos.filter((todo) => todo.isFinished);
    //   },
    //   unfinishedTodos(state) {
    //     return state.todos.filter((todo) => !todo.isFinished)
    //   },
    //   /**
    //    * @returns {{ text: string, id: number, isFinished: boolean }[]}
    //    */
    //   filteredTodos(state) {
    //     if (this.filter === "finished") {
    //       // call other getters with autocompletion ✨
    //       return this.finishedTodos
    //     } else if (this.filter === "unfinished") {
    //       return this.unfinishedTodos
    //     }
    //     return this.todos
    //   },
  },
  actions: {
    // any amount of arguments, return a promise or not
    setPokemons(pokemonsList: { name: string; url: string }[]) {
      // you can directly mutate the state
      this.pokemons = pokemonsList;
    },
  },
});