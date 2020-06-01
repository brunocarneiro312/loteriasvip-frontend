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

   @import './assets/css/tailblocks.css';

   * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
   }

</style>
