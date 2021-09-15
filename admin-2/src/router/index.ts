import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Login',
		component: () => import('@/views/Auth.vue'),
		// beforeEnter: checkLogin
	},
	{
		path: '/dash-board',
		name: 'DashBoard',
		component: () => import('../views/Dashboard.vue'),
		children: [
			{
				path: 'user',
				component: () => import('@/components/User/index.vue'),
			},
			{
				path: 'chat-bot',
				component: () => import('@/components/ChatBot/index.vue'),
				children: [
					{
						path: '',
						component: () => import('@/components/ChatBot/ManageComponent.vue'),
					},
					{
						path: 'add',
						component: () => import('@/components/ChatBot/AddComponent.vue'),
					},
				],
			},
		],
	},
];
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
