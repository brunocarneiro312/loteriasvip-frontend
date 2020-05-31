<template>
   <div>
      ListaCompradores
   </div>
</template>

<script>

   import axios from 'axios';

    export default {
        name: "ListaCompradores",
        data: function() {
            return {
                compradores: [],
                response: {
                    error: undefined
                }
            }
        },
        created() {
            axios.get('http://localhost:8080/loteriasvip/api/v1/upload/jogos/lotofacil', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                }
            })
            .then((response) => {
                this.compradores = response.data;
            })
            .catch((error) => {
                this.response.error = error;
            })
        }
    }
</script>

<style scoped>

</style>