import VueRouter from 'vue-router';

import loginRoutes from '../sys/login/login.routes';
import mallsRoutes from './malls/malls.routes';

const routes = [
    {
        path: '/',
        redirect: {name: 'layout'}
    },
    ...loginRoutes,
    ...mallsRoutes,
];


const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
