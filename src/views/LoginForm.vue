<template>
   <div class="form-login">
      <section class="text-gray-700 body-font">
         <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div
               class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
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
                  <button
                     class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                     Saiba Mais
                  </button>
               </div>
            </div>
            <div class="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
               <h2 class="text-green-800 text-lg font-medium title-font mb-5">Acesse sua conta</h2>
               <label class="text-green-700">E-mail</label>
               <input
                  class="bg-white rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
                  placeholder="" type="email" v-model="request.username">
               <label class="text-green-700">Senha</label>
               <input
                  class="bg-white rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
                  placeholder="" type="password" v-model="request.password">
               <button
                  v-if="!isLoading"
                  class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-3"
                  @click="login">Entrar
               </button>
               <button
                  v-if="isLoading"
                  disabled
                  class="text-white bg-green-300 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-3">
                  Aguarde...
               </button>
               <router-link to="/esqueci-senha" class="text-xs text-green-400 mt-3">Preciso de ajuda!</router-link>
            </div>
         </div>
      </section>
   </div>
</template>

<script>
    import apiCaller from "../apiCaller";
    import eventbus from "../eventbus";

    export default {
        name: "LoginForm",
        data: function () {
            return {
                isLoading: false,
                request: {
                    username: undefined,
                    password: undefined,
                },
                response: {
                    error: undefined,
                    errorCode: undefined,
                }
            }
        },
        methods: {
            login() {
                this.isLoading = true;
                apiCaller.login(this.request)
                    .then((response) => {
                        if (!localStorage.tokenData) {
                           localStorage.setItem('tokenData', response.data['token']);
                           localStorage.setItem('userCodigo', response.data['codigo']);
                           localStorage.setItem('userEmail', response.data['email']);
                           localStorage.setItem('userRoles', response.data['role']);
                           eventbus.emitLoginEvent();
                        }
                        this.$toast.open({
                            message: 'Usuário autenticado',
                            type: 'success',
                            position: 'top-right'
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.response.error = error;
                        this.response.errorCode = error.status;
                        this.$toast.open({
                            message: 'Erro de autenticação',
                            type: 'error',
                            position: 'top-right'
                        });
                    })
                    .finally(() => this.isLoading = false);
            }
        }
    }
</script>

<style scoped lang="scss">
   .error-message {
      background: #d35b5b;
      padding: 5px;
      margin-bottom: 10px;
      color: white;
      border-radius: 5px;
   }
</style>