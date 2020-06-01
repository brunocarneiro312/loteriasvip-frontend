<template>
   <div>
      <section class="text-gray-700 body-font">
         <div class="container px-5 py-24 mx-auto">
            <div class="text-center mb-5">
               <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Importar jogos</h1>
               <p class="mb-8 leading-relaxed">Selecione o arquivo contendo a lista de compradores para realizar a importação e clique em <b>importar</b></p>
               <p class="mb-8 leading-relaxed">O arquivo de compradores deve ser uma planilha no formato <b>.xlsx</b> e deve obedecer o template</p>
            </div>
            <div class="flex flex-wrap -m-4">
               <div class="p-4 md:w-1/2 w-full">
                  <div class="h-full p-8 rounded glass-container">
                     <h1 class="heading-text">Lotofacil</h1>
                     <div>
                        <label class="file">
                           <input type="file" name="file" id="file" class="inputfile" />
                           <label for="file">Selecionar arquivo</label>
                        </label>
                     </div>
                     <div class="flex">
                        <button class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">Importar</button>
                     </div>
                  </div>
               </div>
               <div class="p-4 md:w-1/2 w-full">
                  <div class="h-full p-8 rounded glass-container">
                     <h1 class="heading-text">Lotomania</h1>
                     <div>
                        <label class="file">
                           <input type="file" name="file" id="file" class="inputfile" />
                           <label for="file">Selecionar arquivo</label>
                        </label>
                     </div>
                     <div class="flex">
                        <button class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg">Importar</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </div>
</template>

<script>
    export default {
        name: "Jogos"
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
      font-size: 1.1em;
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

   .glass-container {
      box-shadow: 0 3px 10px #ddd;
   }

   .heading-text {
      font-size: 2em;
   }
</style>