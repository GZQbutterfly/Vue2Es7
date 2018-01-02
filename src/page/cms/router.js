import VueRouter from 'vue-router';

import purchaseRoutes from './purchase/purchase.routes';
import orderRoutes from './order/order.routes';
import authRoutes from './auth/auth.routes';
import gradeRoutes from './grade/grade.routes';
import myRoutes from './my/my.routes';
// ==>
const routes = [
    {
        path: '/',
        redirect: {
            name: 'cms_home'
        }
    }, {
        path: '/cms_home',
        name: 'cms_home',
        component: (resolve) => {
            require.ensure([], require => {
                resolve(require('./home/home.js')['CmsHome']);
            }, `cms/home`);
        }
    },
    ...purchaseRoutes,
    ...authRoutes,
    ...myRoutes
];

// ==>
const router = new VueRouter({
    mode: 'hash',
    routes
});

// ==>
export default router;
