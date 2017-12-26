import VueRouter from 'vue-router';


import { UserInfoPage } from './userinfo/userinfo';


const routes = [
    {
        path: '/',
        redirect: {
            name: 'userinfo'
        }
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        component: (resolve) => resolve(UserInfoPage)
    }
];




const router = new VueRouter({
    //mode: 'history',
    routes
});



export default router;
