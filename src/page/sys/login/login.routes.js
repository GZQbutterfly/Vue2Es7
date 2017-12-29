
const routes = [
    {
        path: '/login',
        name: 'login',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./layout')['LoginLayout']);
            }, 'sys/login/login');
        }
    },
    {
        path: '/loginBack',
        name: 'loginBack',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./back/back')['LoginBack']);
            }, 'sys/login/login');
        }
    }
];

export default routes;
