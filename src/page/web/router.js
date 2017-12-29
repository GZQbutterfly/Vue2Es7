import VueRouter from 'vue-router';

import sysRoutes from '../sys/sys.routes';
import mallsRoutes from './malls/malls.routes';
import orderRoutes from './order/order.routes';


const routes = [
    {
        path: '/',
        redirect: {name: 'layout'}
    },
    // sys
    ...sysRoutes,
    // 商城 malls
    ...mallsRoutes,
    // 订单order
    ...orderRoutes,
];


const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
