import VueRouter from 'vue-router';
// ==>
import {UserInfoPage} from './userinfo/userinfo';


// ==>
const routes = [
    {
        path: '/',
        redirect: {
            name: 'userinfo'
        }
    }, {
        path: '/userinfo',
        name: 'userinfo',
        component: (resolve) => resolve(UserInfoPage)
    }, {
        path: '/home',
        name: 'home',
        component: (resolve) => {
            require.ensure([], require => {
                resolve(require('./home/home.js')['HomePage']);
            }, `cms/home`);
        }
    }
];

// ==>
const router = new VueRouter({
    mode: 'hash',
    routes
});

// ==>
export default router;
