import loginRoutes from './login/login.routes';

const routes = [
    ...loginRoutes,
    // 搜索
    {
        path: '/search',
        name: 'search',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./search/search')['Search']);
            }, 'sys/system');
        },
        history: false
    }, {
        path: '/address',
        name: 'address',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./address/address')['Address']);
            }, 'sys/system');
        }
    }, {
        path: '/messageNotice',
        name: 'messageNotice',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./notice/message/message.notice')['MessageNotice']);
            }, 'sys/system');
        }
    },
    // 无忧本草协议
    {
        path: '/wybcProtocol',
        name: 'wybcProtocol',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./protocol/protocol')['Protocol']);
            }, 'sys/system');
        }
    }
];

export default routes;
