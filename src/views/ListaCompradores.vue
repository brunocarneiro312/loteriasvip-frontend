<template>
   <div id="lista-compradores">
      <section class="text-gray-700 body-font mb-5">
         <div class="container mx-auto flex px-5 items-center justify-center flex-col">
            <div class="text-center lg:w-2/3 w-full">
               <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Importar lista de
                  clientes</h1>
               <p class="mb-8 leading-relaxed">Selecione o arquivo contendo a lista de compradores para realizar a
                  importação e clique em <b>importar</b></p>
               <p class="mb-8 leading-relaxed">O arquivo de clientes deve ser uma planilha no formato <b>.xlsx</b> e
                  deve obedecer o <b class="text-green-500" style="text-decoration: underline; cursor: pointer">template</b></p>
               <div>
                  <label class="file">
                     <input type="file" name="file" id="file" class="inputfile" @change="setCompradoresFile"/>
                     <label for="file">Selecionar arquivo</label>
                  </label>
               </div>
               <div class="flex justify-center">
                  <button @click="importarClientes"
                          class="inline-flex text-white bg-green-500 border-0 py-2 px-6 mb-5 focus:outline-none hover:bg-green-700 rounded text-lg" v-if="!isLoading">
                     Importar
                  </button>
                  <button disabled="true" class="inline-flex text-white bg-green-300 border-0 py-2 px-6 mb-5 focus:outline-none hover:bg-green-700 rounded text-lg" v-if="isLoading">
                     Carregando...
                  </button>
               </div>
               <div v-if="response.compradores.msg">
                  {{ response.compradores.msg }}
               </div>
            </div>
         </div>
      </section>
      <section class="text-gray-700 body-font" v-if="false">
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
                  <tr v-for="comprador in response.compradores" :key="comprador.codigo">
                     <td class="px-4 py-3">{{ comprador.codigo }}</td>
                     <td class="px-4 py-3">{{ comprador.nome }}</td>
                     <td class="px-4 py-3">{{ comprador.email }}</td>
                     <td class="px-4 py-3">{{ comprador.telefone }}</td>
                  </tr>
                  <tr v-if="!response.compradores.length">
                     <td colspan="4">Não existem compradores cadastrados</td>
                  </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </section>
   </div>
</template>

<script>
    import apiCaller from "../apiCaller";
    import eventbus from "../eventbus";

    export default {
        name: "ListaCompradores",
        data: function () {
            return {
                isLoading: false,
                compradoresFile: undefined,
                response: {
                    compradores: []
                }
            }
        },
        methods: {
            importarCompradores() {

                if (!this.compradoresFile)
                    return;

                let formData = new FormData();
                formData.append("file", this.compradoresFile);

                this.isLoading = true;
                apiCaller.uploadCompradores(formData)
                  .then(() => {
                      this.listarCompradores();
                      this.$toast.open({message: 'Arquivo importado com sucesso!', type: 'success', position: 'top-right'})
                  })
                .catch((error) => {
                    switch (error.response.status) {
                        case 401:
                            this.$toast.open({message: 'Usuário não autenticado', type: 'error', position: 'top-right'});
                            break;
                        case 403:
                            this.$toast.open({message: 'Privilégios insuficientes', type: 'error', position: 'top-right'});
                            break;
                        default:
                            this.$toast.open({
                                message: 'Houve um erro ao importar arquivo de compradores',
                                type: 'error'
                            });
                    }
                })
                .finally(() => this.isLoading = false);
            },

            setCompradoresFile(event) {
                this.compradoresFile = event.target.files[0];
            },

            listarCompradores() {
                this.isLoading = true;
                eventbus.$emit('overlay', true);
                apiCaller.listarCompradores()
                  .then((response) => this.response.compradores = response.data)
                  .catch(() => {
                      this.$toast.open({
                          message: 'Houve um erro ao listar os compradores',
                          type: 'error',
                          position: 'top-right'
                      });
                  })
                .finally(() => {
                    this.isLoading = false;
                    eventbus.$emit('overlay', false);
                });
            },

            importarClientes() {
                if (!this.compradoresFile)
                    return;

                let formData = new FormData();
                formData.append("file", this.compradoresFile);

                this.isLoading = true;
                apiCaller.importarClientes(formData)
                    .then((response) => {
                        // this.listarCompradores();
                        this.response.compradores = response.data;
                        eventbus.$emit('listaCompradores', this.response.compradores);
                        this.$toast.open({message: 'Arquivo importado com sucesso!', type: 'success', position: 'top-right'})
                    })
                    .catch((error) => {
                        switch (error.response.status) {
                            case 401:
                                this.$toast.open({message: 'Usuário não autenticado', type: 'error', position: 'top-right'});
                                break;
                            case 403:
                                this.$toast.open({message: 'Privilégios insuficientes', type: 'error', position: 'top-right'});
                                break;
                            default:
                                this.$toast.open({
                                    message: 'Houve um erro ao importar arquivo de compradores',
                                    type: 'error'
                                });
                        }
                    })
                    .finally(() => this.isLoading = false);
            }
        },
        created() {
            this.listarCompradores();
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
