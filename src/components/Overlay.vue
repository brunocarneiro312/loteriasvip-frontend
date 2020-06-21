<template>
   <div id="overlay">
      <div id="overlay-container">
         <div class="svg-container">

            <img class="animated-logo" src="../assets/img/clover-3.svg" alt="">
               
            <div style="font-size: 2em; color: #69bf1a; margin-top:25px">
               Aguarde...
            </div>
         </div>
      </div>
   </div>
</template>

<script>
    export default {
        name: "Overlay"
    }
</script>

<style scoped lang="scss">
   #overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 99;
      background: white;
      opacity: .9;
      display: flex;
      justify-content: center;
      align-items: center;;

      .animated-logo {
         animation-name: flip-diagonal-tr;
         animation-duration: 1.2s;
         animation-timing-function: linear;
         animation-delay: 0s;
         animation-iteration-count: infinite;
         animation-direction: alternate;
         animation-fill-mode: none;
      }

      .svg-container {
         text-align: center;
      }
   }
   @keyframes flip-diagonal-tr {
      0%{
         -webkit-transform: rotate(-360deg);
         transform: rotate(-360deg);
         opacity: 0;
      }
      100%{
         -webkit-transform: rotate(0);
         transform: rotate(0);
         opacity: 1;
      }
   }
</style>
