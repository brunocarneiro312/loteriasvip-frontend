<template>
   <div>
      <section class="text-gray-700 body-font">
         <div class="container px-5 py-24 mx-auto">
            <div class="text-center mb-5">
               <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Importar jogos</h1>
               <p class="mb-8 leading-relaxed">Selecione o arquivo contendo a lista de compradores para realizar a
                  importação e clique em <b>importar</b></p>
               <p class="mb-8 leading-relaxed">O arquivo de compradores deve ser uma planilha no formato <b>.xlsx</b> e
                  deve obedecer o template</p>
            </div>
            <div class="flex flex-wrap -m-4">
               <div class="p-4 md:w-1/2 w-full">
                  <div class="h-full p-8 rounded glass-container">
                     <h1 class="heading-text">Lotofacil</h1>
                     <div>
                        <label class="file">
                           <input type="file" name="file" class="inputfile" id="file" @change="setLotofacilFile"/>
                        </label>
                     </div>
                     <div class="flex">
                        <button
                           v-if="!isLoading"
                           @click="importarLotofacil"
                           class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">
                           Importar
                        </button>
                        <button
                           v-if="isLoading"
                           disabled="true"
                           class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">
                           Carregando...
                        </button>
                     </div>
                     <div v-if="response.lotofacil.msg">
                        {{ response.lotofacil.msg }}
                     </div>
                  </div>
               </div>
               <div class="p-4 md:w-1/2 w-full">
                  <div class="h-full p-8 rounded glass-container">
                     <h1 class="heading-text">Lotomania</h1>
                     <div>
                        <label class="file">
                           <input type="file" name="file" class="inputfile" @change="setLotomaniaFile"/>
                        </label>
                     </div>
                     <div class="flex">
                        <button
                           v-if="!isLoading"
                           @click="importarLotomania"
                           class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">
                           Importar
                        </button>
                        <button
                           v-if="isLoading"
                           disabled="true"
                           class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">
                           Carregando...
                        </button>
                     </div>
                     <div v-if="response.lotomania.msg">
                        {{ response.lotomania.msg }}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section class="text-gray-700 body-font">
         <div class="container mx-auto flex items-center justify-center flex-col">
            <div style="overflow-x: auto; max-width: 80vw">
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
                        Premiado
                     </th>
                     <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                        Sequencia
                     </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="jogo in response.jogos" :key="jogo.codigoJogo">
                     <td class="px-4 py-3">{{ jogo.codigoJogo }}</td>
                     <td class="px-4 py-3">{{ jogo.tipoJogo }}</td>
                     <td class="px-4 py-3">{{ jogo.premiado }}</td>
                     <td class="px-4 py-3">{{ jogo.sequencia }}</td>
                  </tr>
                  <tr v-if="!response.jogos.length">
                     <td colspan="4">Não existem jogos cadastrados</td>
                  </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </section>
   </div>
</template>

<script>

    import axios from "axios";

    export default {
        name: "Jogos",
        data: function () {
            return {
                isLoading: false,
                lotofacilFile: undefined,
                lotomaniaFile: undefined,
                response: {
                    lotofacil: {
                        msg: undefined
                    },
                    lotomania: {
                        msg: undefined
                    },
                    jogos: [],
                }
            }
        },
        created() {
            this.listarJogos();
        },
        methods: {
            importarLotofacil() {

                if (!this.lotofacilFile)
                    return;

                let formData = new FormData();
                formData.append("file", this.lotofacilFile);

                this.isLoading = true;
                axios.post('http://ec2-18-220-216-83.us-east-2.compute.amazonaws.com:8080/loteriasvip/api/v1/upload/lotofacil', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                    }
                }).then(() => {
                    this.$toast.open({
                        message: 'Arquivo importado com sucesso',
                        type: 'success',
                        position: 'top-right'
                    });
                    this.listarJogos();
                }).catch(() => {
                    this.$toast.open({
                        message: 'Erro ao importar arquivo',
                        type: 'error',
                        position: 'top-right'
                    });
                }).finally(() => {
                    this.isLoading = false;
                })
            },

            importarLotomania() {

                if (!this.lotomaniaFile)
                    return;

                let formData = new FormData();
                formData.append("file", this.lotomaniaFile);

                this.isLoading = true;
                axios.post('http://ec2-18-220-216-83.us-east-2.compute.amazonaws.com:8080/loteriasvip/api/v1/upload/lotomania', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                    }
                }).then(() => {
                    this.$toast.open({
                        message: 'Arquivo importado com sucesso!',
                        type: 'success',
                        position: 'top-right'
                    });
                    this.listarJogos();
                }).catch(() => {
                    this.$toast.open({
                        message: 'Erro ao importar arquivo',
                        type: 'error',
                        position: 'top-right'
                    });
                }).finally(() => {
                    this.isLoading = false;
                })
            },

            listarJogos() {
                axios.get('http://ec2-18-220-216-83.us-east-2.compute.amazonaws.com:8080/loteriasvip/api/v1/jogos', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                    }
                }).then((response) => {
                    this.response.jogos = response.data;
                }).catch(() => {
                    this.$toast.open({
                        message: 'Houve um erro ao listar os jogos',
                        type: 'error',
                        position: 'top-right'
                    });
                })
            },

            setLotofacilFile(event) {
                this.lotofacilFile = event.target.files[0];
            },

            setLotomaniaFile(event) {
                this.lotomaniaFile = event.target.files[0];
            }
        }
    }
</script>

<style scoped>
   p {
      margin: 0;
   }

   input[type="file"] {
      margin: 20px 0;
   }

   .glass-container {
      box-shadow: 0 3px 10px #ddd;
   }

   .heading-text {
      font-size: 2em;
   }

   #toolbar {
      margin: 0;
   }
</style>