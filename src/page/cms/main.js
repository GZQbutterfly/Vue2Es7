import Vue from 'vue';

import './module';


import router from './router';
import store from './store';


new Vue({
    el: '#app',
    router,
    store
});
