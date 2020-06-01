<template>
   <div id="home">
      <section class="text-gray-700 body-font">
         <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
               <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-green-500">LoteriasVip</h1>
               <span class="subheading text-green-700">A maneira inteligente de apostar!</span>
               <div class="mt-4">
                  <ul class="hero-list text-gray-500">
                     <li> Administre os seus jogos de forma inteligente</li>
                     <li> Verifique automaticamente se sua sequência foi premiada</li>
                     <li> Gere sequências automaticamente</li>
                     <li> Acompanhe o resultado dos jogos</li>
                  </ul>
               </div>
               <p class="mb-8 leading-relaxed"></p>
               <div class="flex justify-center">
                  <button class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Saiba Mais</button>
               </div>
            </div>
            <div class="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
               <h2 class="text-green-800 text-lg font-medium title-font mb-5">Acesse sua conta</h2>
               <label class="text-green-700">E-mail</label>
               <input class="bg-white rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4" placeholder="" type="email">
               <label class="text-green-700">Senha</label>
               <input class="bg-white rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4" placeholder="" type="password">
               <button class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-3">Entrar</button>
               <a href="#" class="text-xs text-green-400 mt-3">Preciso de ajuda!</a>
            </div>
         </div>
      </section>
   </div>
</template>

<script>

    import axios from 'axios';

    export default {
        name: 'Home',
        components: {},
        data: function () {
            return {
                request: {
                    arquivoCompradores: undefined,
                    arquivoLotofacil: undefined,
                    arquivoLotomania: undefined,
                },
                fileType: undefined,
            }
        },
        methods: {
            onFileChange(event, fileType) {
                switch (fileType) {
                    case 1:
                        this.request.arquivoCompradores = event.target.files[0];
                        console.log(event.target.files[0]);
                        this.fileType = 1;
                        break;
                    case 2:
                        this.request.arquivoLotofacil = event.target.files[0];
                        console.log(event.target.files[0]);
                        this.fileType = 2;
                        break;
                    case 3:
                        this.request.arquivoLotomania = event.target.files[0];
                        console.log(event.target.files[0]);
                        this.fileType = 3;
                        break;
                    default:
                        console.log('Arquivo não suportado!');
                }
            },
            sendFile(file) {
                let formData = new FormData();
                formData.append("file", file);

                let endpoint = undefined;

                if (this.fileType === 1) {
                    endpoint = 'http://localhost:8080/loteriasvip/api/v1/upload/compradores';
                }
                if (this.fileType === 2) {
                    endpoint = 'http://localhost:8080/loteriasvip/api/v1/upload/lotofacil';
                }
                if (this.fileType === 3) {
                    endpoint = 'http://localhost:8080/loteriasvip/api/v1/upload/lotomania';
                }

                axios.post(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicnVuby5jYXJuZWlybzMxMkBnbWFpbC5jb20iLCJleHAiOjE1OTEzNzgxNzksImlhdCI6MTU5MDc3MzM3OX0.bSvgW8ZzLpv1NHTyEFCcaVPW16bSK_3cdmM7Iow3y48OIJE_0tBXJJReFuy7-DMGb6DidID3CXJscUAzGg3Wnw'
                    }
                }).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style lang="scss">
   @import '../assets/css/tailblocks.css';

   * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
   }

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
