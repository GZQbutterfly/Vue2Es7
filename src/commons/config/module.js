import Vue from 'vue';


// 外部组件 ==>
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueScroller from 'vue-scroller';
import VueProgressiveImage from 'vue-progressive-image';


Vue.use(Vuex);
Vue.use(VueRouter);

// 下拉刷新上拉加载
Vue.use(VueScroller);

// 渐进式图片加载
Vue.use(VueProgressiveImage, {
    delay: 100,
    blur: 10
});


// <==

// 内部组件 ==>
import ContainerComponent from '../vue_plugins/components/container/container.vue';
import PullRefresh from '../vue_plugins/components/pull_refresh/pull_refresh.vue';


Vue.component('app-container', ContainerComponent);
Vue.component('pull-refresh', PullRefresh);
// <==


// 引入过滤器
import '../vue_plugins/filters/commons';
