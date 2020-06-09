<template>
   <div id="form-esqueci-senha">
      <div class="lg:w-2/6 md:w-2/2 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto w-full mt-10 md:mt-0">
         <h2 class="text-green-800 text-lg font-medium title-font mb-5">Recuperar Senha</h2>
         <label class="text-green-700">E-mail</label>
         <input
            class="bg-white rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
            placeholder="" type="email" v-model="request.username">
         <label class="text-green-700">Confirme o e-mail</label>
         <input
            class="bg-white rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
            placeholder="" type="email" v-model="confirmEmail">
         <button
            v-if="!isLoading"
            :disabled="!request.username || !confirmEmail"
            class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-3"
            @click="sendPasswordReset">Enviar
         </button>
         <button
            v-if="isLoading"
            disabled
            class="text-white bg-green-300 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-3">
            Aguarde...
         </button>
      </div>
   </div>
</template>

<script>
    import eventbus from "../eventbus";

    export default {
        name: "EsqueciSenha",
        data() {
            return {
                isLoading: undefined,
                confirmEmail: undefined,
                request: {
                    username: undefined,
                }
            }
        },
        created() {
            eventbus.$emit('esconderBotaoCadastro');
        },
        methods: {
            sendPasswordReset() {
                console.log('reset password');
                this.$toast.open({
                    message: 'E-mail enviado com sucesso!',
                    type: 'success',
                    position: 'top-right'
                });
            }
        }
    }
</script>

<style scoped>

</style>