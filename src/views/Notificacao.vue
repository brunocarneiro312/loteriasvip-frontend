<template>
   <div id="notificacao-container">
      <div style="overflow-x: auto; margin: 0 5%">
         <table id="table-clientes" class="table-auto w-full text-center whitespace-no-wrap mt-5">
            <thead>
            <tr>
               <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                  Titulo
               </th>
               <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                  Mensagem
               </th>
               <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                  Data/Hora
               </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(notificacao) in notificacoes" :key="notificacao.dataHoraNotificacao" :class="notificacao.notificacaoVisualizada ? '' : 'new'">
               <td class="px-4 py-3">{{ notificacao.titulo }}</td>
               <td class="px-4 py-3">{{ notificacao.mensagem }}</td>
               <td class="px-4 py-3">{{ getDataHora(notificacao.dataHoraNotificacao) }}</td>
            </tr>
            <tr v-if="!notificacoes.length">
               <td colspan="4">Sem notificações</td>
            </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script>
    import apiCaller from "../apiCaller";
    import eventbus from "../eventbus";

    export default {
        name: "Notificacao",
        data: function () {
            return {
                notificacoes: []
            }
        },
        computed: {},
        methods: {
            countNotificacaoByCliente() {
                apiCaller.countNotificacaoByCliente()
                    .then((response) => eventbus.$emit('updateNotificacoes', response.data))
                    .catch((err) => console.log(err));
            },
            getNotificacaoByClientes() {
                apiCaller.getNotificacaoByCliente()
                    .then((response) => this.notificacoes = response.data)
                    .catch((err) => console.log(err));
            },
            getDataHora(dataHora) {
                let ano = dataHora.toString().substring(0, 4);
                let mes = dataHora.toString().substring(5, 7);
                let dia = dataHora.toString().substring(8, 10);
                let hora = dataHora.toString().substring(11, 13);
                let minuto = dataHora.toString().substring(14, 16);
                return dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto;
            }
        },
        created() {
            this.getNotificacaoByClientes();

            setTimeout(() => {
                this.notificacoes
                    .filter(n => n.notificacaoVisualizada == false)
                    .forEach(n => apiCaller.marcarNotificacaoVista(n.id));
            }, 2000);

        }
    }
</script>

<style scoped>
   .new {
      background: #bff2d4;
   }
</style>
