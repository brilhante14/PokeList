<script lang="ts">
import axios from "axios";

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
      getHeight(heightInDm: number) {
         return (heightInDm * 10).toFixed(2);
      },
      getWeight(weightInHg: number) {
         return (weightInHg / 10).toFixed(0);
      },
      formatName(name: string) {
         return name.charAt(0).toUpperCase() + name.substring(1);
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
         })
         .catch((_) => {
            this.$router.push("/error");
         });
   },
};
</script>

<template>
   <main v-if="pokemonDetails.id">
      <strong class="pokemonName">{{ formatName(pokemonDetails.name) }}</strong>

      <div class="pokemonContainer">
         <div class="imageContainer">
            <img
               class="pokemonImage"
               :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`"
               :alt="pokemonDetails.name"
            />
            <img
               class="pokemonImage"
               :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonDetails.id}.png`"
               :alt="`${pokemonDetails.name} costas`"
            />
         </div>

         <div class="infoContainer">
            <span class="info">
               <strong class="infoTitle">Altura:</strong>
               {{ pokemonDetails.height }} cm
            </span>
            <span class="info">
               <strong class="infoTitle">Peso:</strong>
               {{ pokemonDetails.weight }} kg
            </span>

            <div>
               <strong class="infoTitle">Tipos</strong>
               <span
                  v-for="pokemonType in pokemonDetails.types"
                  :key="pokemonType"
                  :class="`pokemonTypes ${pokemonType}`"
               >
                  {{ formatName(pokemonType) }}
               </span>
            </div>

            <div>
               <strong class="infoTitle">Características</strong>
               <div class="pokemonStats">
                  <span
                     class="gridInfo"
                     v-for="stat in pokemonDetails.stats"
                     :key="stat.name"
                  >
                     {{ formatName(stat.name) + ": " + stat.baseStat }}
                  </span>
               </div>
            </div>
            <div>
               <strong class="infoTitle">Habilidades</strong>
               <div class="pokemonStats">
                  <span
                     class="gridInfo"
                     v-for="ability in pokemonDetails.abilities"
                     :key="ability"
                  >
                     {{ formatName(ability) }}
                  </span>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>

<style>
main {
   display: flex;
   flex-direction: column;
   align-items: center;
}

.pokemonContainer {
   display: flex;
   gap: 5rem;
}

.pokemonName {
   font-size: xx-large;
   font-weight: 900;
   color: antiquewhite;
   margin: 1rem 0;
}

.imageContainer {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   border: 1px solid grey;
}

.pokemonImage {
   height: 200px;
}

.infoContainer {
   width: 625px;
   border: 1px solid grey;
   border-radius: 8px;
   padding: 1rem;

   display: flex;
   flex-direction: column;
   gap: 1.2rem;
}

.infoTitle {
   font-weight: bold;
   color: antiquewhite;
}

.pokemonTypes {
   color: #fff;
   border: 2px solid #000;

   border-radius: 20px;
   padding: 4px 16px;
   margin-left: 1rem;
}

.pokemonMeasures {
   display: flex;
}

.pokemonStats {
   display: grid;
   grid-template: "1fr 1fr";
   border: 1px solid #0f2027;
   background: linear-gradient(to bottom, #d5d7e5, #eee, #d5d7e5);
   border-radius: 8px;
   column-gap: 150px;
   padding: 1rem;
}

.info {
   color: antiquewhite;
}

.gridInfo {
   color: black;
}

@media (max-width: 850px) {
   .imageContainer {
      flex-direction: row;
   }

   .pokemonContainer {
      flex-direction: column;
      gap: 2rem;
   }
}

@media (max-width: 650px) {
   .infoContainer {
      width: 300px;
   }

   .imageContainer {
      flex-direction: row;
   }

   .pokemonImage {
      height: 100px;
   }

   .pokemonContainer {
      flex-direction: column;
      gap: 2rem;
   }

   .pokemonStats {
      column-gap: 15px;
   }

   .gridInfo {
      font-size: small;
   }
}
</style>
