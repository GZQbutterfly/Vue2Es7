
//import {HomePage} from './home/home.js';
//import {UserInfoPage} from './userinfo/userinfo';

const routes = [
    {
        path: '/layout',
        name: 'layout',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./layout/layout')['Layout']);
            }, 'web/malls/malls');
        },
        redirect: {name: 'home'},
        children: [
            // 首页
            {
                path: '/home',
                name: 'home',
                title: '微商城',
                meta: {
                    keepAlive: true
                },
                component: resolve => {
                    require.ensure([], require => {
                        resolve(require('./home/home')['Home']);
                    }, 'web/malls/malls');
                }
            },
            // 购物车
           {
               path: '/shoppcar',
               name: 'shoppcar',
               meta: { keepAlive: true },
               component: resolve => {
                   require.ensure([], require => {
                       resolve(require('./shop_car/shop_car')['ShopCar']);
                   }, 'web/malls/malls');
               }
           },
            // 我的
           {
               path: '/userinfo',
               name: 'userinfo',
               meta: { keepAlive: true },
               component: resolve => {
                   require.ensure([], require => {
                       resolve(require('./userinfo/userinfo')['UserInfo']);
                   }, 'web/malls/malls');
               }
           },
        ]
    }
];

export default routes;
