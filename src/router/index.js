import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListaCompradores from "../views/ListaCompradores";
import ListaJogosLotofacil from "../views/ListaJogosLotofacil";
import ListaJogosLotomania from "../views/ListaJogosLotomania";
import LoginForm from "../views/LoginForm";
import Arquivos from "../views/Arquivos";
import Jogos from "../views/Jogos";
import Clientes from "../views/Clientes";
import Perfil from "../views/Perfil";
import Cadastro from "../views/Cadastro";
import Sequencias from "../views/Sequencias";
import MeusJogos from "../views/MeusJogos";
import GerarSequencia from "../views/template/GerarSequencia";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cadastro',
        name: 'Cadastro',
        component: Cadastro
    },
    {
        path: '/arquivos',
        name: 'Aquivos',
        component: Arquivos
    },
    {
        path: '/jogos',
        name: 'Jogos',
        component: Jogos
    },
    {
        path: '/sequencias',
        name: 'Sequencias',
        component: Sequencias
    },
    {
        path: '/clientes',
        name: 'Clientes',
        component: Clientes
    },
    {
        path: '/meus-jogos',
        name: 'MeusJogos',
        component: MeusJogos
    },
    {
        path: '/gerar-sequencia',
        name: 'GerarSequencia',
        component: GerarSequencia
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil
    },
    {
        path: '/compradores',
        name: 'ListaCompradores',
        component: ListaCompradores
    },
    {
        path: '/login',
        name: 'LoginForm',
        component: LoginForm
    },
    {
        path: '/jogos-lotofacil',
        name: 'ListaJogosLotofacil',
        component: ListaJogosLotofacil
    },
    {
        path: '/jogos-lotomania',
        name: 'ListaJogosLotomania',
        component: ListaJogosLotomania
    },
]

const router = new VueRouter({
    routes
})

export default router
