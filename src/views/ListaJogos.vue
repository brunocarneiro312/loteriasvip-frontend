<template>
   <section class="text-gray-700 body-font">
      <div class="container mx-auto flex items-center justify-center flex-col">
         <div style="overflow-x: auto; max-width: 80vw">
            <table id="table-clientes" class="table-auto w-full text-left whitespace-no-wrap mt-5">
               <thead>
               <tr>
                  <th
                     class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tl rounded-bl">
                     #
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                     Tipo
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                     Premiado
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                     Sequencia
                  </th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="jogo in listaJogos" :key="jogo.codigoJogo">
                  <td class="px-4 py-3">{{ jogo.codigoJogo }}</td>
                  <td class="px-4 py-3">{{ jogo.tipoJogo }}</td>
                  <td class="px-4 py-3">{{ jogo.premiado }}</td>
                  <td class="px-4 py-3">{{ jogo.sequencia }}</td>
               </tr>
               <tr v-if="!listaJogos.length">
                  <td colspan="4">Não existem jogos cadastrados</td>
               </tr>
               </tbody>
            </table>
         </div>
      </div>
   </section>
</template>

<script>
    import apiCaller from "../apiCaller";
    import eventbus from "../eventbus";

    export default {
        name: "ListaJogos",
        data: function() {
            return {
                listaJogos: []
            }
        },
        methods: {
            listar() {
                eventbus.$emit('overlay', true);
                apiCaller.listJogos()
                  .then((response) => this.listaJogos = response.data)
                  .catch((error) => console.log(error))
                  .finally(() => eventbus.$emit('overlay', false));
            }
        },
        created() {
            this.listar();
        }
    }
</script>

<style scoped>

</style>
