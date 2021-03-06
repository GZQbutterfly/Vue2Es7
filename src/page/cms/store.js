import Vuex from 'vuex';

import {http} from 'common.env';


import dialog from '../../commons/vue_plugins/components/popup/dialog';
//import info from '../components/popup/info';
// import popup from '../components/popup/base';
// import loadding from '../components/popup/loadding';
import toast from '../../commons/vue_plugins/components/popup/toast';

import { getLocalUserInfo } from 'common.env';

const store = new Vuex.Store({
    modules: {
        //i18n: vuexI18n.store,
    },
    state: {
        $dialog: dialog,
        // $info: info,
        // $loadding: loadding,
        $toast: toast,
        $http: http(),
        // $popup: popup,
        workVO: {
            env: process.env.NODE_ENV,
            lang: 'zh_cn',
            user: getLocalUserInfo()
        },
        shopCar: {
            count: 0
        },
        // 缓存数据
        cache: {

        }
    },
    mutations: {
        increment(state) {

        }
    }
});

export default store;
