<template>
   <div id="app">
      <Overlay v-if="overlay"></Overlay>
      <CustomHeader />
      <div>
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
    import eventbus from "./eventbus";
    import CustomHeader from "./views/template/CustomHeader";
    import Overlay from "./components/Overlay";

    export default {
        name: 'App',
        components: {Overlay, CustomHeader},
        data: function () {
            return {
                isUserLoggedIn: false,
                userData: undefined,
                overlay: false,
            }
        },
        created() {
            if (localStorage.getItem('tokenData')) {
               this.isUserLoggedIn = true;
            }

            eventbus.loginEvent((value) => {
                this.userData = localStorage.getItem('userData');
                this.isUserLoggedIn = value;
            });

            eventbus.logoutEvent(() => {
                this.isUserLoggedIn = false;
            });

            eventbus.$on('overlay', (isOverlay) => {
                this.overlay = isOverlay
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

   button:disabled {
      opacity: .5;
      cursor: not-allowed;
   }
</style>
