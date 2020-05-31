<template>
   <div class="form-login">
      <div>
         <label for="input-email">Email</label>
         <input type="email" id="input-email" v-model="request.username" />
      </div>
      <div>
         <label for="input-password">Password</label>
         <input type="email" id="input-password" v-model="request.password" />
      </div>
      <div>
         <button id="input-submit" @click="login">
            Entrar
         </button>
      </div>
   </div>
</template>

<script>

   import axios from 'axios';
   import eventbus from "../eventbus";


    export default {
        name: "LoginForm",
        data: function() {
            return {
                request: {
                    username: undefined,
                    password: undefined,
                },
                response: undefined
            }
        },
        methods: {
            login() {
                axios.post('http://localhost:8080/loteriasvip/auth', this.request)
                  .then((response) => {
                      if (!localStorage.tokenData) {
                        localStorage.setItem('tokenData', response.data['token']);
                        eventbus.$emit('loginEvent', true);
                      }
                      console.log(response.data);
                  })
                  .catch((error) => {
                      console.log(error);
                  })
            }
        }
    }
</script>

<style scoped lang="scss">
   .form-login {
      box-shadow: 0 1px 10px #ddd;
      margin: 10% auto;
      max-width: 400px;
      padding: 25px;
      display: flex;
      flex-direction: column;
      font-family: Verdana;

      label {
         display: block;
         color: #969696;
         margin-bottom: 5px;
      }

      input {
         width: 100%;
         border-radius: 0;
         border: 0;
         border-bottom: 2px solid #f5f5f5;
         background: #f5f5f5;
         padding: 10px;
         margin-bottom: 20px;
         transition: all .3s;

         &:focus {
            border: 0;
            outline: none;
            border-bottom: 2px solid #2d6ff8;
         }
      }

      button {
         width: 100%;
         margin-top: 20px;
         padding: 10px;
         border-radius: 0;
         border: 0;
         outline: none;
         background: #2d6ff8;
         color: white;
         font-size: 1.1em;
         cursor: pointer;
         transition: all .3s;

         &:hover {
            opacity: .9;
         }
      }
   }
</style>