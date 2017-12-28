
const routes = [
    {
        path: '/login',
        name: 'login',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./layout')['LoginLayout']);
            }, 'web/login/login');
        }
    },
    {
        path: '/loginBack',
        name: 'loginBack',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./back/back')['LoginBack']);
            }, 'web/login/login');
        }
    }
];

export default routes;
