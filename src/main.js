import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import store from './vuex/store.js';

Vue.config.productionTip = false;

import router from './router/router.js';
import './config/ie';


import promise from 'es6-promise';
promise.polyfill();

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import highcharts from 'highcharts';
import VueHighCharts from 'vue-highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
Vue.use(VueHighCharts);
highcharts3d(highcharts);

import './assets/css/app.dev.scss';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    watch: {
        $route (to, from) {
            document.onkeydown = function(e) {
                let ev = (typeof event!= 'undefined') ? window.event : e;
                
                if(ev.keyCode == 13 && e.target.nodeName == 'BUTTON') {
                    return false;
                }
            }
        }
    }
});
