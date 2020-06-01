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
                           <input type="file" name="file" class="inputfile" id="file" @change="setLotofacilFile" />
                        </label>
                     </div>
                     <div class="flex">
                        <button
                           @click="importarLotofacil"
                           class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">
                           Importar
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
                           @click="importarLotomania"
                           class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">
                           Importar
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
   </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Jogos",
        data: function () {
            return {
                lotofacilFile: undefined,
                lotomaniaFile: undefined,
                response: {
                    lotofacil: {
                        msg: undefined
                    },
                    lotomania: {
                        msg: undefined
                    }
                }
            }
        },
        methods: {
            importarLotofacil() {

                if (!this.lotofacilFile)
                    return;

                let formData = new FormData();
                formData.append("file", this.lotofacilFile);

                axios.post('http://localhost:8080/loteriasvip/api/v1/upload/lotofacil', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                    }
                }).then(() => {
                    this.response.lotofacil.msg = "Arquivo importado com sucesso!";
                }).catch((error) => {
                    this.response.lotofacil.msg = "Erro ao importar arquivo.";
                    console.log(error);
                })
            },

            importarLotomania() {

                if (!this.lotomaniaFile)
                    return;

                let formData = new FormData();
                formData.append("file", this.lotomaniaFile);

                axios.post('http://localhost:8080/loteriasvip/api/v1/upload/lotomania', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                    }
                }).then(() => {
                    this.response.lotomania.msg = "Arquivo importado com sucesso!";
                }).catch(() => {
                    this.response.lotomania.msg = "Erro ao importar arquivo";
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
</style>