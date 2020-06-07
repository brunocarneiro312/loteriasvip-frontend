<template>
   <div class="container">
      <div style="overflow-x: scroll;max-width: 80vw;">
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
               <td><span class="badge" v-for="s in jogo.sequencia" :key="s">{{s}}</span></td>
            </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script>

    import apiCaller from "../apiCaller";

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
            apiCaller.listJogosLotomania()
               .then((response) => this.jogos = response.data)
               .catch((error) => this.response.error = error);
        }
    }
</script>

<style scoped lang="scss">
   .container {
      padding: 15px;
   }

   .badge {
      background: #969696;
      color: white;
      font-weight: bold;
      padding: 2.5px 5px;
      border-radius: 5px;
      margin: 5px;
      font-size: 0.8em;
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
               padding: 10px;
            }

            &:hover {
               background: #444;
               color: white;
            }
         }
      }
   }
</style>