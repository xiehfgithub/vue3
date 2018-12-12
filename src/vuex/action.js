import Vue from 'vue'
export default {
  hello ({ commit }, platform) {
    commit('hello', platform)
  },
  anchor ({ state, commit, rootState }, platform) {
  	console.log('来自actions.js: ---%O---%O---%s', state, rootState, platform)
  	commit('xhfHello', platform)
  },  
  ChangeHeaderBarPage_sexIndexAct ({ state,commit }, platform) { // 切换男生|女生类型 跟换请求数据
  	if(platform == state.headerBarPage.sexIndexAct){
			return console.log("同类型不需要切换请求数据");
		}else{
			let url = '/API/users';
			axios.get(url, {
	      params: {
	        sex: platform
	      },
	      headers: {
	        token: state.loginUserInfo.userSig
	      }
	    }).then(function (res) {
	      console.log('axios get模式请求【同$.get】:%O', res.data);
	      
	      commit('ChangeHeaderBarPage_sexIndexAct', platform,JSON.stringify(res.data));
	    }).catch(function (err) {
	      console.log(err);
	      Vue.$toast({
				  message: err,
				  position: 'middle',
				  duration: 1000
				})
	    })
						
		}  	
  },
  login ({state,commit,dispatch }, platform=""){
  	let user;
  	if(!localStorage.loginUserInfo || (localStorage.loginUserInfo && !JSON.parse(localStorage.loginUserInfo).nick)){
  		let url = '/API/users/cblogin';
			//模拟： 俩个账号["lstk","18701481351"]成功---login.vue
			let _usename = "18701481351";
			if(typeof platform == "function"){
				_usename = platform.prototype.usename;
			}		
			console.log(`登录账号${_usename}`)
			
			
  		axios.get(url, {
	      params: {
	        usename: _usename,
	        password: "123456"
	      },
	      headers: {
	        token: null
	      }
	    }).then(function (res) {
		      console.log(res.data);
		      if(res.data.status == 1){
		      	user = res.data.data;
		      	commit('login', user);
		      	dispatch('ChangeHeaderBarPage_sexIndexAct', user.sex == 1?user.sex:0);
						typeof platform == "function" && platform()
		      }else{
		      	Vue.$toast({
					  message: res.data.msg,
					  position: 'middle',
					  duration: 1000
					})
	      }	      
	      
	    }).catch(function (err) {
	      console.log(err);
	      Vue.$toast({
				  message: err,
				  position: 'middle',
				  duration: 1000
				})
	    })
  	} else {
  		user = JSON.parse(localStorage.loginUserInfo);
  		commit('login', user);
  		commit('ChangeHeaderBarPage_sexIndexAct', user.sex == 1?user.sex:0);
  	}
  	
  }
}
