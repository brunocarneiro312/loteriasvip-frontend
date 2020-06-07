<template>
   <div>
      <h1>Perfil</h1>
      <button @click="logout">Sair</button>
   </div>
</template>

<script>

   import eventbus from "../eventbus";

    export default {
        name: "Perfil",
        methods: {
            logout() {
                localStorage.removeItem('tokenData');
                eventbus.logoutEvent(undefined);
            }
        }
    }
</script>

<style scoped>

</style>