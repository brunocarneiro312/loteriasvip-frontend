<template>
   <div id="compradores">
      <section class="text-gray-700 body-font">
         <div class="container mx-auto flex px-5 items-center justify-center flex-col">
            <div class="text-center lg:w-2/3 w-full">
               <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Distribuir Sequências</h1>
            </div>
         </div>
      </section>
      <section class="text-gray-700 body-font">
         <div class="container px-5 mx-auto">
            <div class="flex flex-wrap -mx-4 -mb-10 text-center">
               <div class="sm:w-1/2 mb-10 px-4">
                  <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Distribuição Igualitária</h2>
                  <p class="leading-relaxed text-base">Distribui as sequências que não tem cliente associado entre o
                     total de clientes de forma igualitária.</p>
                  <p class="leading-relaxed text-base">Fórmula: Total de Jogos / Total de Clientes</p>
                  <p class="leading-relaxed text-base text-gray-500">Ex: Se houver 10 clientes e 100 jogos, então cada
                     cliente receberá 10 jogos.</p>
                  <button @click="distribuirIgualmente"
                          class="flex mx-auto mt-6 text-white bg-green-500 border-0 py-2 px-5 focus:outline-none hover:bg-green-600 rounded">
                     Distribuir Igualmente
                  </button>
               </div>
               <div class="sm:w-1/2 mb-10 px-4">
                  <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Distribuição Avulsa</h2>
                  <p class="leading-relaxed text-base">Distribui as sequências que não tem cliente de forma avulsa.</p>
                  <input style="max-width: 200px"
                         class="mt-3 w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-green-500 text-base px-4 py-2"
                         placeholder="Jogos por cliente"
                         v-model="qtdJogosPorPessoa"
                         type="number">
                  <button @click="distribuirAvulso"
                          class="flex mx-auto mt-6 text-white bg-green-500 border-0 py-2 px-5 focus:outline-none hover:bg-green-600 rounded">
                     Distribuição avulsa
                  </button>
               </div>
            </div>
         </div>
      </section>
<!--      <section class="text-gray-700 body-font">-->
<!--         <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">-->
<!--            <div class="text-center lg:w-2/3 w-full">-->
<!--               <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Prévia</h1>-->
<!--               <p class="leading-relaxed text-base">Visualize quais jogos serão enviados para quais clientes.</p>-->
<!--            </div>-->
<!--            <div class="mt-3">-->
<!--               <div v-if="previa.length">-->
<!--                  <div>-->
<!--                     <table id="table-clientes" class="table-auto w-full text-left whitespace-no-wrap">-->
<!--                        <thead>-->
<!--                        <tr>-->
<!--                           <th-->
<!--                              class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tl rounded-bl">-->
<!--                              #-->
<!--                           </th>-->
<!--                           <th-->
<!--                              class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">-->
<!--                              Nome-->
<!--                           </th>-->
<!--                           <th-->
<!--                              class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">-->
<!--                              Email-->
<!--                           </th>-->
<!--                           <th-->
<!--                              class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">-->
<!--                              Jogos-->
<!--                           </th>-->
<!--                           &lt;!&ndash;                           <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">&ndash;&gt;-->
<!--                           &lt;!&ndash;                              Sequência&ndash;&gt;-->
<!--                           &lt;!&ndash;                           </th>&ndash;&gt;-->
<!--                        </tr>-->
<!--                        </thead>-->
<!--                        <tbody>-->
<!--                        <tr v-for="(p, index) in previa" :key="index">-->
<!--                           <td class="px-4 py-3">{{ index + 1 }}</td>-->
<!--                           <td class="px-4 py-3">{{ p.nome }}</td>-->
<!--                           <td class="px-4 py-3">{{ p.email }}</td>-->
<!--                           <td>-->
<!--                              <table class="table-auto w-full text-left whitespace-no-wrap">-->
<!--                                 <thead>-->
<!--                                 <tr>-->
<!--                                    <td>Sequências</td>-->
<!--                                 </tr>-->
<!--                                 </thead>-->
<!--                                 <tbody>-->
<!--                                 <tr v-for="(jogo, index) in p.jogos" :key="index">-->
<!--                                    <td v-if="jogo">{{ jogo.sequencia }}</td>-->
<!--                                 </tr>-->
<!--                                 </tbody>-->
<!--                              </table>-->
<!--                           </td>-->
<!--                        </tr>-->
<!--                        <tr v-if="!clientes.length">-->
<!--                           <td colspan="4">Não existem clientes cadastrados</td>-->
<!--                        </tr>-->
<!--                        </tbody>-->
<!--                     </table>-->
<!--                  </div>-->
<!--               </div>-->
<!--               <div v-else>-->
<!--                  <span class="text-gray-500">Nenhum tipo de distribuição foi selecionado.</span>-->
<!--               </div>-->
<!--            </div>-->
<!--            <div>-->
<!--               <button @click="confirmarDistribuicao"-->
<!--                       class="flex mx-auto mt-6 text-white bg-green-500 border-0 py-2 px-5 focus:outline-none hover:bg-green-600 rounded">-->
<!--                  Confirmar distribuição-->
<!--               </button>-->
<!--            </div>-->
<!--         </div>-->
<!--      </section>-->
   </div>
</template>

<script>
    import apiCaller from "../apiCaller";

    export default {
        name: "Sequencias",
        data: function () {
            return {
                qtdJogosPorPessoa: undefined,
                mode: undefined,
                clientes: [],
                jogosSemDono: [],
                previa: [],
                response: {
                    error: undefined
                },
                request: {
                    jogosDTORequest: [],
                    clientesDTORequest: []
                }
            }
        },
        created() {

        },
        methods: {
            async listarClientes() {
                await apiCaller.listarClientes()
                    .then((response) => this.clientes = response.data)
                    .catch((error) => {
                        console.log(error);
                        this.$toast.open({
                            message: 'Não foi possível obter os clientes',
                            type: 'error',
                            position: 'top-right'
                        })
                    });
            },
            async listarJogosSemDono() {
                await apiCaller.listarJogosSemDono()
                    .then((response) => this.jogosSemDono = response.data)
                    .catch((error) => {
                        console.log(error);
                        this.$toast.open({
                            message: 'Não foi possível obter os jogos',
                            type: 'error',
                            position: 'top-right'
                        })
                    });
            },
            async distribuirIgualmente() {

                this.mode = 1;
                await this.listarClientes();
                await this.listarJogosSemDono();

                let qtdClientes = this.clientes.length;
                let qtdJogosSemDono = this.jogosSemDono.length;
                let qtdJogosPorCliente = qtdJogosSemDono / qtdClientes;

                if (qtdClientes && qtdJogosSemDono) {

                    this.clientes.forEach((c) => {
                        this.request.clientesDTORequest.push({
                            "email": c.email
                        });
                    });

                    this.jogosSemDono.forEach((j) => {
                        this.request.jogosDTORequest.push({
                            "codigoJogo": j.codigoJogo
                        });
                    });

                    let countJogoVigente = 0;

                    for (let i = 0; i < qtdClientes; i++) {
                        let cliente = {
                            nome: this.clientes[i].nome,
                            email: this.clientes[i].email,
                            jogos: []
                        };

                        for (let x = 0; x < qtdJogosPorCliente; x++) {
                            cliente.jogos.push(this.jogosSemDono[countJogoVigente++]);
                        }

                        this.previa.push(cliente);
                    }
                }
            },

            async distribuirAvulso() {
                this.mode = 2;
                await this.listarClientes();
                await this.listarJogosSemDono();

                let qtdClientes = this.clientes.length;
                let qtdJogosSemDono = this.jogosSemDono.length;
                let qtdJogosPorCliente = this.qtdJogosPorPessoa;

                if (qtdClientes && qtdJogosSemDono) {
                    this.clientes.forEach((c) => {
                        this.request.clientesDTORequest.push({
                            "email": c.email
                        });
                    });

                    this.jogosSemDono.forEach((j) => {
                        this.request.jogosDTORequest.push({
                            "codigoJogo": j.codigoJogo
                        });
                    });

                    let countJogoVigente = 0;

                    for (let i = 0; i < qtdClientes; i++) {
                        let cliente = {
                            nome: this.clientes[i].nome,
                            email: this.clientes[i].email,
                            jogos: []
                        };

                        for (let x = 0; x < qtdJogosPorCliente; x++) {
                            cliente.jogos.push(this.jogosSemDono[countJogoVigente++]);
                        }

                        this.previa.push(cliente);
                    }
                }
            },

            confirmarDistribuicao() {
                if (this.mode === 1) {
                    if (this.jogosSemDono.length && this.clientes.length) {
                        apiCaller.distribuirJogosSemDono()
                            .then((response) => {
                                console.log(response.data);
                                this.$toast.open({
                                    message: 'Distribuição realizada com sucesso!',
                                    type: 'success',
                                    position: 'top-right'
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                                this.$toast.open({
                                    message: 'Erro ao realizar a distribuição.',
                                    type: 'error',
                                    position: 'top-right'
                                })
                            });
                    }
                }
                if (this.mode === 2) {
                    if (this.jogosSemDono.length && this.clientes.length) {
                        apiCaller.distribuirJogosSemDonoAvulso(this.qtdJogosPorPessoa)
                            .then((response) => {
                                console.log(response.data);
                                this.$toast.open({
                                    message: 'Distribuição realizada com sucesso!',
                                    type: 'success',
                                    position: 'top-right'
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                                this.$toast.open({
                                    message: 'Erro ao realizar a distribuição.',
                                    type: 'error',
                                    position: 'top-right'
                                })
                            });
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
