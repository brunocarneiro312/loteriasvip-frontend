<template>
   <section class="text-gray-700 body-font">
      <div class="container mx-auto flex px-5 py-5 items-center justify-center flex-col">
         <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Meus Jogos</h1>
         </div>
         <div class="overflow-y-container">
            <table id="table-clientes" class="table-auto w-full text-left whitespace-no-wrap">
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
                     Sequência
                  </th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="jogo in response.jogos" :key="jogo.codigoJogo">
                  <td class="px-4 py-3">{{ jogo.codigoJogo }}</td>
                  <td class="px-4 py-3">{{ jogo.tipoJogo }}</td>
                  <td class="px-4 py-3">{{ jogo.sequencia }}</td>
               </tr>
               <tr v-if="!response.jogos.length">
                  <td colspan="4">Não existem clientes cadastrados</td>
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
        name: "MeusJogos",
        data: function() {
            return {
                response: {
                    jogos: []
                }
            }
        },
        created() {
            apiCaller.getJogosCliente()
               .then((response) => this.response.jogos = response.data)
               .catch((error) => console.log(error));

            apiCaller.countNotificacaoByCliente()
                .then((response) => eventbus.$emit('updateNotificacoes', response.data))
                .catch((err) => console.log(err));
        }
    }
</script>

<style scoped>
   .overflow-y-container {
      max-width: 90%;
      overflow-y: auto;
   }
</style>
