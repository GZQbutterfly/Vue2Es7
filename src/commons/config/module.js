import Vue from 'vue';


// 外部组件 ==>
import VueRouter from 'vue-router';
import Vuex from 'vuex';


Vue.use(Vuex);
Vue.use(VueRouter);






// <==

// 内部组件 ==>
import ContainerComponent from '../vue_plugins/components/container/container.vue';


Vue.component('app-container', ContainerComponent);
// <==
