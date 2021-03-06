import Vue from 'vue'
import VueRouter from 'vue-router'
import CheckAuth from './CheckAuth';

//components
import Home from '@/components/Home';
import Login from '@/components/account/Login';
import Register from '@/components/account/Register';
import Chat from '@/components/chat/Chat';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: CheckAuth
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/Chat/:id',
        name: 'Chat',
        component: Chat,
        beforeEnter: CheckAuth,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
