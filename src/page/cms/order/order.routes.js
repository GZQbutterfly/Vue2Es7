

const routes = [
    {
        path: '/cmsout_order',
        name: 'cmsout_order',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./out/out.order')['OutOrder']);
            }, 'cms/order/order');
        }
    }, {
        path: '/cms_stock_order',
        name: 'cms_stock_order',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./stock/stock.order')['StockOrder']);
            }, 'cms/order/order');
        }
    }, {
        path: '/cms_stock_order_detail',
        name: 'cms_stock_order_detail',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./stock/detail/stock.order.detail')['StockOrderDetail']);
            }, 'cms/order/order');
        }
    }, {
        path: '/cms_out_order_detail',
        name: 'cms_out_order_detail',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./out/detail/out.order.detail')['OutOrderDetail']);
            }, 'cms/order/order');
        }
    }
];

export default routes;
