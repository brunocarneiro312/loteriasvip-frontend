<template>
   <section class="text-gray-700 body-font relative">
      <div class="container px-5 py-24 mx-auto">
         <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Solicitar Sequência</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Obtenha uma sequência nova ao clicar em "solicitar
               sequência"</p>
         </div>
         <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
               <div class="p-2 w-full">
                  <textarea
                     class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-48 focus:border-green-500 text-base px-4 py-2 resize-none block"
                     :value="response.jogo.sequencia " disabled></textarea>
               </div>
               <div class="p-2 w-full">
                  <button
                     @click="solicitarJogo"
                     class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                     Solicitar Sequência
                  </button>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
    import apiCaller from "../../apiCaller";

    export default {
        name: "GerarSequencia",
        data() {
            return {
                response: {
                    jogo: {
                        sequencia: undefined,
                        message: undefined,
                    },
                }
            }
        },
        methods: {
            solicitarJogo() {
                apiCaller.solicitarSequencia()
                    .then((response) => {
                        this.response.jogo = response.data;
                        this.$toast.open({message: this.response.jogo.message, type: 'success', position: 'top-right'})
                    })
                    .catch((error) => {
                        this.$toast.open({message: error.response.data.message, type: 'error', position: 'top-right'})
                    })
            }
        }
    }
</script>

<style scoped>

</style>