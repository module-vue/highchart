import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const list = r => require.ensure([], () => r(require('../page/list/list')), 'list');

const routes = [
	{
		path: '/home',
		component: home,
	},
	{
		path: '/list',
		component: list
	},
	{
		path: '*',
		redirect: '/home'
	}
];


const router = new VueRouter({
	mode: 'history',
	routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
        }
    }
});

export default router;
