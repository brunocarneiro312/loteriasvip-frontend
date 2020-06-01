<template>
   <div id="cadastro">
      <section class="text-gray-700 body-font relative">
         <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-12">
               <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-700">Cadastro</h1>
               <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-green-600">Efetue o cadastro gratuito em nossa plataforma informando os seus dados</p>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
               <div class="flex flex-wrap -m-2">
                  <div class="p-2 w-full">
                     <label class="text-green-500">Nome</label>
                     <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2" placeholder="" type="text">
                  </div>
                  <div class="p-2 w-full">
                     <label class="text-green-500">Email</label>
                     <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2" placeholder="" type="email">
                  </div>
                  <div class="p-2 w-full">
                     <label class="text-green-500">Senha</label>
                     <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2" placeholder="" type="password">
                  </div>
                  <div class="p-2 w-full">
                     <label class="text-green-500">Confirme a sua senha</label>
                     <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2" placeholder="" type="password">
                  </div>
                  <div class="p-2 w-full mt-3">
                     <button class="flex text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Finalizar Cadastro</button>
                  </div>
                  <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                     <p class="leading-normal my-5">LoteriasVip</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </div>
</template>

<script>
    export default {
        name: "Cadastro"
    }
</script>

<style scoped>

</style>