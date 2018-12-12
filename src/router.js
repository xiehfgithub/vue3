import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/index/index.vue'
import Index1 from './views/index1/index.vue'
//为了路由守卫里能获取到全局store对象 引入
import store from './vuex/store'

Vue.use(Router)

//export default new Router({
const router = new Router({	
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      alias: '/', // 路径显示不变 组件内容实际为index.vue
      name: 'index',
      component: Index,
      'meta': {
				requiresAuth: false,
        keepAlive: true // 需要被缓存
      },
			children:[
				{
					path:	""
				},
				{
					path:	"/index1",
					component: Index1
				},
				{
					path:	"/home",
					component: Home
				}
			]
    }, {
      path: '/index1',
      alias: '/indexBase', // 路径显示不变 组件内容实际为index.vue
      name: 'index1',
      component: Index1
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
			component: () => import('./views/About.vue')
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }, {
      path: '/login',
      name: 'login',
      component: () => import('./views/stockCircle/Login/Login.vue')
    },
		{
			path: '/stockCircle/',
			name: 'stockCircle',
			component: () => import('./views/stockCircle/CircleSelectHome/CircleSelectHome.vue'),
			meta: { keepAlive: true }
		},
		{
			path: '/stockCircle/CircleSelectHome',
			name: 'stockCircleHome',
			component: () => import('./views/stockCircle/CircleSelectHome/CircleSelectHome.vue'),
			meta: { keepAlive: true },
			beforeEnter: 	(to, from, next) => {
				console.log(`方式1:单条路由内加beforeEnter守卫:列表页进入前守卫检查登录信息`);
				console.log(from);
				next()
      }
		},
		{
			path: '/stockCircle/timelineList/:cid',
			name: 'stockCircleTimeline',
			component: () => import('./views/stockCircle/TimelineList/TimelineList.vue'),
			meta: { keepAlive: true }
			
		},
		{
			path: '/stockCircle/circleDetail/:tid',
			name: 'stockCircleDetail',
			component: () => import('./views/stockCircle/CircleDetail/CircleDetail.vue'),
			meta: { requiresAuth: true }
		}	
		
  ]
})

/*
 全局导航守卫中检查元字段meta: { requiresAuth: true }的页面 进行登录信息验证 没登陆跳转登录页
 方式1:单条路由内加beforeEnter守卫	示例：stockCircleHome
 方式2:组件内加beforeRouteEnter守卫	示例：stockCircleTimeline
 方式3:元字段配合全局函数判断是否需要 检查登录信息   示例：以下
 不允许匿名访问的个人觉得1、3比较合适 允许匿名访问的参考2适合对应不同业务情景进行检测登录
 */
const auth = {
	loggedIn: function(){
		if(typeof store.state.loginUserInfo.userId == "undefined"){
			console.log("方式3:元字段配合全局函数判断是否需要 检查登录信息:无登录信息");
			return true;
		}else{
			console.log("方式3:元字段配合全局函数判断是否需要 检查登录信息:有登录信息");
			return false;
		}
	}
}
router.beforeEach((to, from, next) => {	
	store.commit("checkLogin");
  if (to.matched.some(record => record.meta.requiresAuth)) {		
    // this route requires auth, check if logged in if not, redirect to login page.
		console.log(store.state.isLogin);
    if (!store.state.isLogin && auth.loggedIn()) {				
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router