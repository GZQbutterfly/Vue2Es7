import VueRouter from 'vue-router';

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
    }
];

// ==>
const router = new VueRouter({
    mode: 'hash',
    routes
});

// ==>
export default router;
