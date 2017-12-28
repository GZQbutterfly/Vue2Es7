import VueRouter from 'vue-router';


import mallsRoutes from './malls/malls.routes';

const routes = [
    {
        path: '/',
        redirect: {name: 'layout'}
    },
    ...mallsRoutes,
];


const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
