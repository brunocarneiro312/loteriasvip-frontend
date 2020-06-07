import Vue from 'vue';

/**
 * ---------------------
 * Barramento de eventos
 * ---------------------
 * @author bruno.carneiro
 */
export default new Vue({
    data() {
        return {

        }
    },
    methods: {

        /**
         * ----------------------
         * Escuta evento de login
         * ----------------------
         */
        loginEvent(callback) {
            this.$on('loginEvent', callback);
        },

        /**
         * Emite evento de login
         */
        emitLoginEvent() {
            this.$emit('loginEvent', true);
        },

        /**
         * -----------------------
         * Escuta evento de logout
         * -----------------------
         */
        logoutEvent(callback) {
            this.$on('logoutEvent', callback);
        },
    }
});