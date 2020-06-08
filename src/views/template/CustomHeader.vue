<template>
   <header class="text-gray-700 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
         <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" @click="goHome()">
            <img id="logo" src="../../assets/img/clover-2.svg" alt="" width="40">
            <span class="ml-3 text-xl" style="color: #788f5d">LoteriasVip</span>
         </a>
         <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <router-link to="/" v-if="isUserLoggedIn" class="mr-5 hover:text-gray-900">Início</router-link>
            <router-link to="/compradores" v-if="isUserLoggedIn && isAdmin" class="mr-5 hover:text-gray-900">Importar clientes</router-link>
            <router-link to="/jogos" v-if="isUserLoggedIn && isAdmin" class="mr-5 hover:text-gray-900">Importar Jogos</router-link>
            <router-link to="/clientes" v-if="isUserLoggedIn && isAdmin" class="mr-5 hover:text-gray-900">Clientes</router-link>
            <router-link to="/sequencias" v-if="isUserLoggedIn && isAdmin" class="mr-5 hover:text-gray-900">Sequências</router-link>
            <router-link to="/meus-jogos" v-if="isUserLoggedIn && !isAdmin" class="mr-5 hover:text-gray-900">Meus Jogos</router-link>
            <router-link to="/gerar-sequencia" v-if="isUserLoggedIn && !isAdmin" class="mr-5 hover:text-gray-900">Solicitar Sequência</router-link>
            <a href="" @click="logout" v-if="isUserLoggedIn" class="mr-5 hover:text-gray-900">Sair</a>
         </nav>
         <router-link to="/cadastro" v-if="!isUserLoggedIn"
                      class="inline-flex items-center bg-green-700 border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-white mt-4 md:mt-0">
            Cadastre-se
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                 class="w-4 h-4 ml-1" viewBox="0 0 24 24">
               <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
         </router-link>
         <span v-else class="text-green-500">{{ userEmail }}</span>
      </div>
   </header>
</template>

<script>

    import eventbus from "../../eventbus";

    export default {
        name: "CustomHeader",
        data: function () {
            return {
                isUserLoggedIn: undefined,
                userEmail: undefined,
                isAdmin: false,
                esconderBotaoCadastro: false
            }
        },
        created() {
            if (localStorage.getItem('tokenData')) {
                this.isUserLoggedIn = true;
                this.userEmail = localStorage.getItem('userEmail');
                this.userRoles = localStorage.getItem('userRoles');
                this.isAdmin = this.userRoles.includes('ROLE_ADMIN');
            }

            eventbus.loginEvent(() => {
                this.isUserLoggedIn = true;
                this.userRoles = localStorage.getItem('userRoles');
                this.userEmail = localStorage.getItem('userEmail');
                this.isAdmin = this.userRoles && this.userRoles.includes('ROLE_ADMIN');
            });

            eventbus.$on('esconderBotaoCadastro', () => {
                this.esconderBotaoCadastro = true;
            });
        },
        methods: {
            goHome() {
                this.$router.push("/");
            },
            logout() {
                localStorage.removeItem('tokenData');
                localStorage.removeItem('userCodigo');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userRoles');
                this.$toast.open({
                    message: 'Usuário deslogado',
                    type: 'success',
                    position: 'top-right'
                });
            }
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