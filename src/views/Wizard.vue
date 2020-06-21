<template>
   <div id="wizard">
      <form-wizard
         @on-complete="onComplete"
         title="Importação de dados"
         subtitle="Siga as etapas indicadas abaixo"
         next-button-text="Próximo"
         back-button-text="Voltar"
         finish-button-text="Finalizar" color="#2f855a">
         <tab-content title="Importar usuários">
            <lista-compradores></lista-compradores>
         </tab-content>
         <tab-content title="Importar jogos">
            <jogos></jogos>
         </tab-content>
         <tab-content title="Distribuir jogos">
            <distribuicao :usuarios="request.compradores" :sequencias="request.jogos"></distribuicao>
         </tab-content>
         <tab-content title="Resumo">
            <table id="table-clientes" class="table-auto w-full text-left whitespace-no-wrap cli-table">
               <thead>
               <tr>
                  <th
                     class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tl rounded-bl">
                     #
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                     Nome
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                     Email
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                     Sequencias
                  </th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="row in request.distribuicao" :key="row.email">
                  <td class="px-4 py-3">{{ row.codigo }}</td>
                  <td class="px-4 py-3">{{ row.nome }}</td>
                  <td class="px-4 py-3">{{ row.email }}</td>
                  <td class="px-4 py-3">
                     <table v-if="row.jogos.length" class="seq-table">
                        <thead>
                           <tr>
                              <th style="padding: 5px">Tipo</th>
                              <th style="padding: 5px">Sequência</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr v-for="(jogo, index) in row.jogos" :key="index">
                              <td style="padding: 5px">{{ jogo.tipoJogo }}</td>
                              <td style="padding: 5px">{{ jogo.sequencia }}</td>
                           </tr>
                        </tbody>
                     </table>
                  </td>
               </tr>
               </tbody>
            </table>
         </tab-content>
      </form-wizard>
   </div>
</template>

<script>

    import ListaCompradores from "./ListaCompradores";
    import Jogos from "./Jogos";
    import Distribuicao from "./Distribuicao";
    import eventbus from "../eventbus";
    import apiCaller from "../apiCaller";
    export default {
        name: "Wizard",
        components: {Distribuicao, Jogos, ListaCompradores},
        data() {
            return {
                request: {
                    compradores: [],
                    jogos: {
                        lotofacil: [],
                        lotomania: [],
                        megasena: []
                    },
                    distribuicao: {

                    },
                }
            }
        },
        methods: {
            onComplete() {
                eventbus.$emit('overlay', true);
                apiCaller.distribuicao(this.request.distribuicao)
                  .then(() => {
                      this.$toast.open({
                          message: 'Distribuição realizada!',
                          type: 'success',
                          position: 'top-right'
                      });
                      this.$router.push("/");

                  })
                  .catch((error) => {
                      this.$toast.open({
                          message: 'Erro ao realizar distribuição de jogos',
                          type: 'error',
                          position: 'top-right'
                      });
                      console.log(error);
                  })
                  .finally(() => eventbus.$emit('overlay', false));
            }
        },
        created() {
            eventbus.$on('listaCompradores', (data) => {
                this.request.compradores = data;
            });
            eventbus.$on('jogosLotofacil', (data) => {
                this.request.jogos.lotofacil = data;
            });
            eventbus.$on('jogosLotomania', (data) => {
                this.request.jogos.lotomania = data;
            });
            eventbus.$on('jogosMegasena', (data) => {
                this.request.jogos.megasena = data;
            });
            eventbus.$on('distribuicao', (data) => {
                this.request.distribuicao = data;
            });
        }
    }
</script>

<style scoped lang="scss">
   #wizard {
      margin: 0 15%;

      .cli-table {
         tr:nth-child(even) {
            background: #f5f5f5;
         }
      }

   }
</style>
