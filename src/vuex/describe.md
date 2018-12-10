###大致描述
***
store.js 和 main.js基本不用修改  vue引入注册全局Vuex功能
======================================================
	1： .vue组件页里的基本为例
	//方式一
	<div :class="{
		'flex-sex-item': true,
		'flex-sex-item-act': $store.state.headerBarPage.sexIndexAct == 0
	}" @click="ChangeHeaderBarPage_sexIndexAct(0)">男生</div>
	//方式二
	<div :class="{
		'flex-sex-item': true,
		'flex-sex-item-act': $store.state.headerBarPage.sexIndexAct == 0
	}" @click="$store.dispatch('ChangeHeaderBarPage_sexIndexAct',0)">男生</div>
	//方式三
	<div :class="{
		'flex-sex-item': true,
		'flex-sex-item-act': $store.state.headerBarPage.sexIndexAct == 0
	}" @click="$store.commit('ChangeHeaderBarPage_sexIndexAct',0)">男生</div>
	
	export default {
	  name: 'hello',
	
	  methods: {
	    ChangeHeaderBarPage_sexIndexAct () {
	      this.$store.dispatch('ChangeHeaderBarPage_sexIndexAct');
	    }
	  }
	}
	//state.js：
	headerBarPage:{
		sexIndexAct: 0	
	}
	//actions.js对应的方法：
		ChangeHeaderBarPage_sexIndexAct ({ commit },platform) {//切换男生|女生类型 跟换请求数据
			commit('ChangeHeaderBarPage_sexIndexAct', platform)
	  }
	//muutations.js对应的方法：
	  ChangeHeaderBarPage_sexIndexAct (state, platform) {
			state.headerBarPage.sexIndexAct = platform;
	  }
	  
	//getter.js：有需要计算过的数据headerBarPageXXX可以在getter里添加变量通过对state 和 其他getter变量结合运算后的computed变量,页面调用数据就用this.$store.getters.getterValueName
		getterValueName:(state, getters) => {
			console.log("计算数据：state、getters 当前顶级对象store包含所有方法");
	  	var json = "state+getters结合各种业务需求运算后"
	  	return json;
	  }
======================================================
step1	
	用户点击行为触发进入methods方法里
	能同步操作的用commit，有异步操作的dispatch;
	this.$store.dispatch('hello对应的actions里方法名') || this.$store.commit('hello对应的mutations里方法名');
step2
	进入actions.js里的自定义act方法；
	hello ({commit, platform}) {
	    commit('hello', platform)
	}
step3
	进入mutations.js；
	hello (state, platform) {
	    state.hello = '改变一下吧'
	}
step4
	进入getter.js过滤计算成最终数据；（计算属性中运算涉及的值的改变始终都会影响数据的最终形态包括默认数据不进行操作时，如果对state数据的值做了改变state也会变换值，可以当做俩个变量使用state.hello和getters.hello【避免混淆尽量不重名】）
	hello: (state) => 'state转化成最终的展示数据：'+state.hello
step5
	完成渲染视图跟新；

***