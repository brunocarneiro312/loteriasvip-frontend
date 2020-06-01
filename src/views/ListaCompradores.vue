<template>
   <div id="lista-compradores">
      <section class="text-gray-700 body-font">
         <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div class="text-center lg:w-2/3 w-full">
               <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Importar lista de
                  compradores</h1>
               <p class="mb-8 leading-relaxed">Selecione o arquivo contendo a lista de compradores para realizar a
                  importação e clique em <b>importar</b></p>
               <p class="mb-8 leading-relaxed">O arquivo de compradores deve ser uma planilha no formato <b>.xlsx</b> e
                  deve obedecer o template</p>
               <div>
                  <label class="file">
                     <input type="file" name="file" id="file" class="inputfile" @change="setCompradoresFile"/>
                     <label for="file">Selecionar arquivo</label>
                  </label>
               </div>
               <div class="flex justify-center">
                  <button @click="importarCompradores"
                          class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">
                     Importar
                  </button>
               </div>
               <div v-if="response.compradores.msg">
                  {{ response.compradores.msg }}
               </div>
            </div>
         </div>
      </section>
   </div>
</template>

<script>

    import axios from 'axios';

    export default {
        name: "ListaCompradores",
        data: function () {
            return {
                compradoresFile: undefined,
                response: {
                    compradores: {
                        msg: undefined
                    },
                }
            }
        },
        methods: {
            importarCompradores() {

                if (!this.compradoresFile)
                    return;

                let formData = new FormData();
                formData.append("file", this.compradoresFile);

                axios.post('http://localhost:8080/loteriasvip/api/v1/upload/compradores', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                    }
                }).then(() => {
                    this.$toast.open({message: 'Arquivo importado com sucesso!', type: 'success', position: 'top'});
                }).catch((error) => {
                    switch (error.response.status) {
                        case 401:
                            this.$toast.open({message: 'Usuário não autenticado', type: 'error', position: 'top'});
                            break;
                        case 403:
                            this.$toast.open({message: 'Privilégios insuficientes', type: 'error', position: 'top'});
                            break;
                        default:
                            this.$toast.open({
                                message: 'Houve um erro ao importar arquivo de compradores',
                                type: 'error'
                            });
                    }
                })
            },

            setCompradoresFile(event) {
                this.compradoresFile = event.target.files[0];
            },
        },
        created() {

        }
    }
</script>

<style scoped>
   p {
      margin: 0;
   }

   .inputfile {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
   }

   .inputfile + label {
      font-size: 1.25em;
      font-weight: 700;
      color: white;
      background-color: #318ec4;
      display: inline-block;
      padding: 10px 10px 15px 10px;
      margin: 25px 0;
      border-radius: 5px;
   }

   .inputfile:focus + label,
   .inputfile + label:hover {
      background-color: #2b6cb0;
   }

   .inputfile + label {
      cursor: pointer;
   }
</style>