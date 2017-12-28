import Vue from 'vue';

import './module';


import router from './router';
import store from './store';


new Vue({
    el: '#app',
    router,
    store
});

let bb = async function (){
    let _b = await Promise.resolve(123);
    console.log(_b);
    return _b;
}
bb();
console.log('app');
