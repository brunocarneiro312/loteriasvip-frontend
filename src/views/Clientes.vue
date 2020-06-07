<template>
   <div id="compradores">
      <section class="text-gray-700 body-font">
         <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div class="text-center lg:w-2/3 w-full">
               <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Clientes Cadastrados</h1>
            </div>
            <div>
               <table id="table-clientes" class="table-auto w-full text-left whitespace-no-wrap">
                  <thead>
                  <tr>
                     <th
                        class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tl rounded-bl">
                        #
                     </th>
                     <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                        Nome
                     </th>
                     <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                        Email
                     </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(cliente, index) in clientes" :key="index">
                     <td class="px-4 py-3">{{ index + 1 }}</td>
                     <td class="px-4 py-3">{{ cliente.nome }}</td>
                     <td class="px-4 py-3">{{ cliente.email }}</td>
                  </tr>
                  <tr v-if="!clientes.length">
                     <td colspan="4">Não existem clientes cadastrados</td>
                  </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </section>
   </div>
</template>

<script>

    import apiCaller from "../apiCaller";

    export default {
        name: "Clientes",
        data: function () {
            return {
                clientes: [],
                response: {
                    error: undefined
                }
            }
        },
        methods: {
            listClientes() {
                apiCaller.listarClientes()
                  .then((response) => this.clientes = response.data)
                  .catch((error) => {
                    switch (error.response.status) {
                        case 401:
                            this.$toast.open({
                                message: 'Acesso não autorizado',
                                type: 'error',
                                position: 'top-right'
                            });
                            break;
                        case 403:
                            this.$toast.open({
                                message: 'Privilégios insuficientes',
                                type: 'error',
                                position: 'top-right'
                            });
                            break;
                        default:
                            this.$toast.open({
                                message: 'Houve um erro ao listar os clientes',
                                type: 'error',
                                position: 'top-right'
                            });
                    }
                });
            }
        },
        created() {
            this.listClientes();
        }
    }
</script>

<style scoped>

</style>