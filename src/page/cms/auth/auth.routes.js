// 实名认证路由

const routes = [
    // 实名认证
    {
        path: '/real_name',
        name: 'real_name',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./realname/real.name')['RealName']);
            }, 'cms/auth/realname');
        }
    },
    // 实名认证填写
    {
        path: '/real_name_form',
        name: 'real_name_form',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./realname/form/form')['RealNameForm']);
            }, 'cms/auth/realname');
        }
    },
    // 实名认证返回结果页
    {
        path: '/real_name_result',
        name: 'real_name_result',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./realname/result/result')['RealNameResult']);
            }, 'cms/auth/realname');
        }
    },
];

export default routes;
