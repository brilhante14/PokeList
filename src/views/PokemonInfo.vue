<script lang="ts">import axios from 'axios';

interface IPokemonDetails {
   id: string;
   name: string;
   stats: {
      baseStat: number;
      name: string;
   }[];
   types: string[];
   weight: string;
   height: string;
   abilities: string[];
}

export default {
   data: () => ({
      pokemonDetails: {} as IPokemonDetails,
   }),
   methods: {
      getHeight(heightInInches: number) {
         return (heightInInches * 2.54).toFixed(2);
      },
      getWeight(weightInLbs: number) {
         return (weightInLbs / 2.205).toFixed(0);
      },
   },
   mounted() {
      axios
         .get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
         .then((response) => {
            const details = response.data;

            const formattedInfo = {
               id: this.$route.params.id as string,
               name: details.name,
               stats: details.stats.map((stat: any) => ({
                  baseStat: stat.base_stat,
                  name: stat.stat.name,
               })),
               types: details.types.map((type: any) => type.type.name),
               weight: this.getWeight(details.weight),
               height: this.getHeight(details.height),
               abilities: details.abilities.map(
                  (ability: any) => ability.ability.name
               ),
            };

            this.pokemonDetails = formattedInfo;
         });
   },
}
</script>

<template>
   <main>
      <div class="infoCard">
         Pokemon {{ pokemonDetails.name }}
      </div>
      <div>

         <div>
            {{ pokemonDetails.height }} cm
            {{ pokemonDetails.weight }} kg
         </div>
         <div>
            {{ pokemonDetails.stats }}
         </div>
         
         <div>
            {{ pokemonDetails.abilities }}
         </div>
         
      </div>
   </main>
</template>

<style>
main {
   display: flex;
}

.infoCard {
   background-color: rebeccapurple;
}

</style>