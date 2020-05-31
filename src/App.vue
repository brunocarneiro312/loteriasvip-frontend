<template>
   <div id="app">
      <header>
         <div id="logo">
            LoteriasVip
         </div>
         <nav>
            <ul v-if="isUserLoggedIn">
               <li><router-link to="/arquivos">Arquivos</router-link></li>
               <li><router-link to="/jogos">Jogos</router-link></li>
               <li><router-link to="/clientes">Clientes</router-link></li>
               <li><router-link to="/perfil">Perfil</router-link></li>
            </ul>
            <ul v-else>
               <li>
                  <router-link to="/login">Login</router-link>
               </li>
            </ul>
         </nav>
      </header>
      <aside>
         <div class="container">
            <ul>
               <li>
                  <router-link to="/">Importar</router-link>
               </li>
               <li>
                  <router-link to="/jogos-lotofacil">Lista de Jogos Lotofacil</router-link>
               </li>
               <li>
                  <router-link to="/jogos-lotomania">Lista de Jogos Lotomania</router-link>
               </li>
            </ul>
         </div>
      </aside>
      <main>
         <router-view/>
      </main>
   </div>
</template>

<script>

   import eventbus from "./eventbus";

    export default {
        name: 'App',
        data: function () {
            return {
                isUserLoggedIn: false
            }
        },
        created() {

            if (localStorage.getItem('tokenData')) {
               this.isUserLoggedIn = true;
            }

            eventbus.$on('loginEvent', (value) => {
                this.isUserLoggedIn = value;
            });

            eventbus.$on('logoutEvent', () => {
                this.isUserLoggedIn = false;
            });
        }
    }
</script>

<style lang="scss">
   * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
   }

   #app {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 15% 4fr;
      grid-template-rows: auto 1fr auto;
      grid-template-areas: "header header" "aside main" "footer footer";
   }

   header {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      background: #ddd;
      grid-area: header;

      nav {
         ul {
            list-style-type: none;

            li {
               display: inline;
               margin-left: 15px;
            }
         }
      }
   }

   aside {
      background: #f5f5f5;
      grid-area: aside;

      ul {
         list-style-type: none;
      }
   }

   main {
      grid-area: main;
   }

   footer {
      grid-area: footer;
   }

   .container {
      padding: 15px;
   }
</style>
