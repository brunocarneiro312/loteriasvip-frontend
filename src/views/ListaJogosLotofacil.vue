<template>
   <div class="container">
      <div class="error-message-container" v-if="response.error">
         {{ response.error }}
      </div>
      <table>
         <thead>
         <tr>
            <th align="left">#</th>
            <th align="left">Tipo de Jogo</th>
            <th align="left">Sequencia</th>
         </tr>
         </thead>
         <tbody>
         <tr v-for="jogo in jogos" :key="jogo.codigoJogo">
            <td>{{ jogo.codigoJogo }}</td>
            <td>{{ jogo.tipoJogo }}</td>
            <td>{{ jogo.sequencia }}</td>
         </tr>
         </tbody>
      </table>
   </div>
</template>

<script>

    import axios from 'axios';

    export default {
        name: "ListaJogosLotofacil",
        data: function () {
            return {
                jogos: [],
                response: {
                    error: undefined,
                }
            }
        },
        created() {
            axios.get("http://localhost:8080/loteriasvip/api/v1/jogos/lotofacil", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                }
            })
             .then((response) => {
                 this.jogos = response.data;
             })
             .catch((error) => {
                 this.response.error = error;
             });
        }
    }
</script>

<style scoped lang="scss">
   .container {
      padding: 15px;
   }

   table {
      width: 100%;
      box-shadow: 0 1px 10px #ddd;

      thead {
         th {
            padding: 5px;
         }
      }

      tbody {
         tr {
            td {
               padding: 5px;
            }

            &:hover {
               background: #f5f5f5;
            }
         }
      }
   }
</style>