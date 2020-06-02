<template>
   <div id="app">
      <CustomHeader />
      <div>
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
    import eventbus from "./eventbus";
    import CustomHeader from "./views/template/CustomHeader";

    export default {
        name: 'App',
        components: {CustomHeader},
        data: function () {
            return {
                isUserLoggedIn: false,
                userData: undefined,
            }
        },
        created() {

            if (localStorage.getItem('tokenData')) {
               this.isUserLoggedIn = true;
            }

            eventbus.$on('loginEvent', (value) => {
                this.userData = localStorage.getItem('userData');
                this.isUserLoggedIn = value;
            });

            eventbus.$on('logoutEvent', () => {
                this.isUserLoggedIn = false;
            });
        }
    }
</script>

<style lang="scss">

   @import './assets/css/tailblocks.css';
   @import '~vue-toast-notification/dist/theme-default.css';
   @import "./assets/css/bootstrap-table.min.css";

   * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
   }

</style>
