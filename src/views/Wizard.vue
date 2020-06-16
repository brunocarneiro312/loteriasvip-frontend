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
            Resumo
         </tab-content>
      </form-wizard>
   </div>
</template>

<script>

    import ListaCompradores from "./ListaCompradores";
    import Jogos from "./Jogos";
    import Distribuicao from "./Distribuicao";
    import eventbus from "../eventbus";
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
                alert('Finalizando');
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

<style scoped>
   #wizard {
      margin: 0 15%;
   }
</style>
