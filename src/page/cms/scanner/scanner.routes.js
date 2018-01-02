// Sacnner
import { EasyScanner } from './easy/easy';


const routes = [
    // ===>
    // 轻松扫描
    {
        path: '/easyScanner',
        name: 'easyScanner',
        component: resolve => {
            require.ensure([], require => {
                resolve(require('./easy/easy')['EasyScanner']);
            }, 'cms/scanner/scanner');
        }
    }
];

export default routes;
