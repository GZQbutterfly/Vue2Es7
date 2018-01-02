// VIP等级路由

const routes = [
    // ===>
    // VIP 等级
    {
        path: '/grade',
        name: 'grade',
        meta: { title: '店长等级' },
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./grade')['Grade']);
            }, 'cms/grade/Grade');
        }
    },
    {
        path: '/gradeUp',
        name: 'gradeUp',
        meta: { title: '立刻晋级' },
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./up/up')['GradeUp']);
            }, 'cms/grade/Grade');
        }
    },
    // GradeGuide
    {
        path: '/gradeGuide',
        name: 'gradeGuide',
        meta: { title: '店长等级说明' },
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./guide/guide')['GradeGuide']);
            }, 'cms/grade/Grade');
        }
    }
];

export default routes;
