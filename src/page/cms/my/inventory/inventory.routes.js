// 我的库存路由

const routes = [
    // 库存列表
    {
        path: '/myInventoryList',
        name: 'myInventoryList',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./inventory_list/inventory.list')['MyInventoryList']);
            }, 'cms/my/inventory');
        }
    },
    // 库存详情
    {
        path: '/myInventoryDetail',
        name: 'myInventoryDetail',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./inventory_detail/inventory.detail')['MyInventoryDetail']);
            }, 'cms/my/sys');
        }
    }
];

export default routes;
