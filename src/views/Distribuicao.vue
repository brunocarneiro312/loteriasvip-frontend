<template>
   <div>
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
   </div>
</template>

<script>
    import eventbus from "../eventbus";

    export default {
        name: "Distribuicao",
        props: {
            usuarios: Array,
            sequencias: Object
        },
        data() {
            return {
                todosOsJogos: [],
                qtdJogosPorPessoa: undefined,
                qtdJogosPorPessoaAvulso: undefined,
                mode: undefined,
                previa: [],
                response: {
                    error: undefined
                },
            }
        },
        methods: {
            distribuirIgualmente() {

                // Seta modo de distribuição
                this.mode = 1;
                this.todosOsJogos = [];

                // Armazena todos os jogos no mesmo arrayr
                if (this.sequencias.lotofacil.length) {
                  this.sequencias.lotofacil.forEach(j => this.todosOsJogos.push(j));
                }
                if (this.sequencias.lotomania.length) {
                  this.sequencias.lotomania.forEach(j => this.todosOsJogos.push(j));
                }
                if (this.sequencias.megasena.length) {
                  this.sequencias.megasena.forEach(j => this.todosOsJogos.push(j));
                }

                // Obtém a quantidade total de jogos e total de usuários
                let qtdJogos = this.todosOsJogos.length;
                let qtdUsuario = this.usuarios.length;

                // Se a quantidade de jogos for maior que a de usuários, divide jogos pelos usuários
                if (qtdJogos > qtdUsuario) {
                    this.qtdJogosPorPessoa = Math.floor(qtdJogos / qtdUsuario);

                    // Pra cada usuário
                    this.usuarios.forEach(usuario => {

                        usuario.jogos = [];

                        // armazena a quantidade de jogos por usuário
                        for (let i = 0; i < this.qtdJogosPorPessoa; i++) {

                            let jogo = this.todosOsJogos.shift();

                            if (jogo && jogo.sequencia && jogo.sequencia.length) {
                                usuario.jogos.push(jogo);
                            }

                        }
                    });

                    eventbus.$emit('distribuicao', this.usuarios);
                }
                // Caso contrário, um jogo para cada usuário até que os jogos acabem
                else {
                    this.qtdJogosPorPessoa = 1;

                    // Pra cada usuário
                    this.usuarios.forEach(usuario => {
                        usuario.jogos = [];
                        // armazena a quantidade de jogos por usuário
                        for (let i = 0; i < this.qtdJogosPorPessoa; i++) {

                            let jogo = this.todosOsJogos.shift();

                            if (jogo && jogo.sequencia && jogo.sequencia.length) {
                                usuario.jogos.push(jogo);
                            }
                        }
                    });

                    eventbus.$emit('distribuicao', this.usuarios);
                }

            },
            distribuirAvulso() {

                this.mode = 2;
                this.todosOsJogos = [];

                // Armazena todos os jogos no mesmo array
                this.sequencias.lotofacil.forEach(j => this.todosOsJogos.push(j));
                this.sequencias.lotomania.forEach(j => this.todosOsJogos.push(j));
                this.sequencias.megasena.forEach(j => this.todosOsJogos.push(j));

                // Pra cada usuário
                this.usuarios.forEach(usuario => {

                    usuario.jogos = [];
                    // armazena a quantidade de jogos por usuário
                    for (let i = 0; i < this.qtdJogosPorPessoa; i++) {
                        let jogo = this.todosOsJogos.shift();

                        if (jogo && jogo.sequencia && jogo.sequencia.length) {
                            usuario.jogos.push(jogo);
                        }
                    }
                });

                eventbus.$emit('distribuicao', this.usuarios);
            }
        }
    }
</script>

<style scoped>

</style>
