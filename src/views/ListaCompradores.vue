<template>
   <div id="lista-compradores">
      <section class="text-gray-700 body-font">
         <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div class="text-center lg:w-2/3 w-full">
               <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Importar lista de compradores</h1>
               <p class="mb-8 leading-relaxed">Selecione o arquivo contendo a lista de compradores para realizar a importação e clique em <b>importar</b></p>
               <p class="mb-8 leading-relaxed">O arquivo de compradores deve ser uma planilha no formato <b>.xlsx</b> e deve obedecer o template</p>
               <div>
                  <label class="file">
                     <input type="file" name="file" id="file" class="inputfile" />
                     <label for="file">Selecionar arquivo</label>
                  </label>
               </div>
               <div class="flex justify-center">
                  <button class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">Importar</button>
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
        data: function() {
            return {
                compradores: [],
                response: {
                    error: undefined
                }
            }
        },
        created() {
            axios.get('http://localhost:8080/loteriasvip/api/v1/upload/jogos/lotofacil', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                }
            })
            .then((response) => {
                this.compradores = response.data;
            })
            .catch((error) => {
                this.response.error = error;
            })
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