<template>
   <header class="text-gray-700 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
         <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img id="logo" src="../../assets/img/clover-2.svg" alt="" width="40">
            <span class="ml-3 text-xl" style="color: #788f5d">LoteriasVip</span>
         </a>
         <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <!--               <a class="mr-5 hover:text-gray-900">First Link</a>-->
            <!--               <a class="mr-5 hover:text-gray-900">Second Link</a>-->
            <!--               <a class="mr-5 hover:text-gray-900">Third Link</a>-->
            <!--               <a class="mr-5 hover:text-gray-900">Fourth Link</a>-->
         </nav>
         <router-link to="/cadastro" class="inline-flex items-center bg-green-700 border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-white mt-4 md:mt-0">Cadastre-se
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
               <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
         </router-link>
      </div>
   </header>
</template>

<script>
    export default {
        name: "CustomHeader",
        methods: {

        }
    }
</script>

<style scoped lang="scss">

   #logo {
      animation-name: flip-diagonal-tr;
      animation-duration: 1s;
      animation-timing-function: ease;
      animation-delay: 0s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-fill-mode: none;
   }

   .hero-list {
      li::before {
         content: "\2192";
      }
   }

   .subheading {
      font-size: 1.5em;
   }

   @keyframes flip-diagonal-tr {
      0%{
         -webkit-transform: rotate3d(1,1,0,0deg);
         transform: rotate3d(1,1,0,0deg);
      }
      100%{
         -webkit-transform: rotate3d(1,1,0,180deg);
         transform: rotate3d(1,1,0,360deg);
      }
   }
</style>