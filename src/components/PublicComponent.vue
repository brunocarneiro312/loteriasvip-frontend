<template>
   <div>
      <section id="root">

      </section>
      <section id="auth">
         <h1>Autenticação</h1>
         <div id="form-auth">
            <div>
               <div class="form-group">
                  <label>Email</label>
                  <input v-model="request.auth.email" type="email"/>
               </div>
               <div class="form-group">
                  <label>Senha</label>
                  <input v-model="request.auth.password" type="password"/>
               </div>
               <div class="form-group">
                  <button @click="login">Entrar</button>
               </div>
            </div>
            <div class="result">
               {{ response.login }}
            </div>
         </div>
      </section>
   </div>
</template>

<script>

    import apiCaller from "../apiCaller";

    export default {
        name: "PublicComponent",
        data() {
            return {
                request: {
                    auth: {
                        email: undefined,
                        password: undefined,
                    }
                },
                response: {
                    login: undefined
                }
            }
        },
        created() {

        },
        methods: {
            login() {
                apiCaller.login({
                    username: this.request.auth.email,
                    password: this.request.auth.password
                }).then((response) => {
                    this.response.login = response.data;
                }).catch((error) => this.response.login = error);
            }
        }
    }
</script>

<style lang="scss" scoped>
   section {

      h1 {
         font-size: 1.5em;
      }

      padding: 25px;

      #form-auth {
         display: flex;

         .form-group {
            display: block;
         }

         .result {
            padding: 25px;
            background: #fbfbfb;
            width: 100%;
            min-width: 500px;
         }
      }
   }

   label {
      display: block;
   }

   button {
      background: #2e3d44;
      color: white;
      padding: 0 5px;
      border-radius: 5px;
   }

   .form-group {
      padding: 5px 15px;
   }
</style>