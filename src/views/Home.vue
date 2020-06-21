<template>
   <div id="home">
      <div class="login" v-if="!isUserLoggedIn">
         <LoginForm></LoginForm>
      </div>
      <div v-else>
         <section class="text-gray-700 body-font" v-if="isAdmin">
            <div class="container px-5 py-24 mx-auto">
               <div class="flex flex-col text-center w-full mb-20">
                  <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Bem-Vindo
                     administrador!</h1>
               </div>
               <div class="flex flex-wrap -m-4 text-center">
                  <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                     <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <img src="../assets/img/pencil.svg" alt="" width="60" class="mx-auto"
                             style="transform: rotate(45deg)">
                        <h2 class="title-font font-medium text-3xl text-gray-900">{{ response.qtdJogos || 0 }}</h2>
                        <router-link to="/lista-jogos" class="leading-relaxed">Jogos</router-link>
                     </div>
                  </div>
                  <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                     <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                             stroke-width="2" class="text-blue-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                           <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                           <circle cx="9" cy="7" r="4"></circle>
                           <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                        </svg>
                        <h2 class="title-font font-medium text-3xl text-gray-900">{{ response.qtdClientes || 0 }}</h2>
                        <router-link to="/clientes" class="leading-relaxed">Clientes</router-link>
                     </div>
                  </div>
                  <div class="p-4 md:w-1/3 sm:w-1/2 w-full text-center">
                     <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <img src="../assets/img/trophy.svg" alt="" width="60" class="mx-auto">
                        <h2 class="title-font font-medium text-3xl text-gray-900">{{ response.qtdPremios || 0 }}</h2>
                        <p class="leading-relaxed">Prêmios</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section class="text-gray-700 body-font" v-if="!isAdmin">
            <div class="container px-5 py-24 mx-auto">
               <div class="flex flex-col text-center w-full mb-20">
                  <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Bem-Vindo!</h1>
               </div>
               <div class="flex flex-wrap -m-4 text-center">
                  <div class="p-4 md:w-1/1 sm:w-1/3 w-full">
                     <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                        <img src="../assets/img/pencil.svg" alt="" width="60" class="mx-auto"
                             style="transform: rotate(45deg)">
                        <h2 class="title-font font-medium text-3xl text-gray-900">{{ response.jogos.length || 0 }}</h2>
                        <p class="leading-relaxed">Jogos</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   </div>
</template>

<script>
    import eventbus from "../eventbus";
    import LoginForm from "./LoginForm";
    import apiCaller from "../apiCaller";

    export default {
        name: 'Home',
        components: {LoginForm},
        data: function () {
            return {
                userEmail: undefined,
                isAdmin: false,
                request: {
                    arquivoCompradores: undefined,
                    arquivoLotofacil: undefined,
                    arquivoLotomania: undefined,
                },
                response: {
                    qtdJogos: undefined,
                    qtdClientes: undefined,
                    qtdPremios: undefined,
                    jogos: [],
                },
                fileType: undefined,
                isUserLoggedIn: false,
            }
        },
        mounted() {
            this.isUserLoggedIn = localStorage.getItem('tokenData');
            this.userEmail = localStorage.getItem('userEmail');
            this.userRoles = localStorage.getItem('userRoles');
            this.isAdmin = this.userRoles && this.userRoles.includes('ROLE_ADMIN');

            if (localStorage.getItem('tokenData') && this.isAdmin) {
                this.isUserLoggedIn = true;
                this.getResumo();
            }
            else if (localStorage.getItem('tokenData')) {
                apiCaller.getJogosCliente()
                    .then((response) => this.response.jogos = response.data)
                    .catch((error) => console.log(error));
            }
            eventbus.loginEvent(() => {
                this.isUserLoggedIn = true;
                this.userRoles = localStorage.getItem('userRoles');
                this.isAdmin = this.userRoles && this.userRoles.includes('ROLE_ADMIN');

                if (this.isAdmin) {
                    this.getResumo();
                }
                else {
                    this.getJogosCliente();
                }
            });

            eventbus.$emit('apresentarBotaoCadastrar');
        },
        methods: {
            getResumo() {
                apiCaller.getResumo()
                    .then((response) => {
                        this.response.qtdJogos = response.data['qtdJogos'];
                        this.response.qtdClientes = response.data['qtdClientes'];
                        this.response.qtdPremios = response.data['qtdPremios'];
                    })
                    .catch((error) => console.log(error));
            },
            getJogosCliente() {
                apiCaller.getJogosCliente()
                    .then((response) => this.response.jogos = response.data)
                    .catch((error) => console.log(error));
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
      0% {
         -webkit-transform: rotate3d(1, 1, 0, 0deg);
         transform: rotate3d(1, 1, 0, 0deg);
      }
      100% {
         -webkit-transform: rotate3d(1, 1, 0, 180deg);
         transform: rotate3d(1, 1, 0, 360deg);
      }
   }
</style>
