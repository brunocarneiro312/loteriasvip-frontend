<template>
   <div>
      <div v-if="response.error">
         {{ response.error }}
      </div>
      <h1>Clientes</h1>
      <div>
         {{ clientes }}
      </div>
   </div>
</template>

<script>

   import axios from 'axios';

    export default {
        name: "Clientes",
        data: function() {
            return {
                clientes: [],
                response: {
                    error: undefined
                }
            }
        },
        methods: {
            listClientes() {
                axios.get("http://localhost:8080/loteriasvip/api/v1/clientes", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenData')
                    }
                })
                .then((response) => {
                    this.clientes = response.data;
                })
                .catch((error) => {
                    this.response.error = error;
                })
            }
        },
        created() {
            this.listClientes();
        }
    }
</script>

<style scoped>

</style>