export default {
  hello (state, platform) {
    state.hello = '改变一下吧'
  },
  anchor (state, platform) {
  	console.log('来自mutations.js: ---%O---', platform)
    state.xhfHello = '我是当前页面的state 全局xhfHello数据【mutation转换】==>' + platform
  },
  ChangeHeaderBarPage_sexIndexAct (state, platform) {
    state.headerBarPage.sexIndexAct = platform;
  },
	checkLogin (state, platform=true) {
		if(localStorage.loginUserInfo && JSON.parse(localStorage.loginUserInfo).nick){	
			if(typeof state.loginUserInfo.userId == "undefined"){
				state.loginUserInfo = JSON.parse(localStorage.loginUserInfo);
				state.isLogin = true;
			}
			console.log("已登录");
		}else{
			state.isLogin = false;
			console.log("未登录");
		}
		return platform;
	},
  login (state, platform) {
    localStorage.loginUserInfo = JSON.stringify(platform);  	
		state.loginUserInfo = platform;
		state.isLogin = true;
  },
  loginOut (state, platform) {
  	localStorage.removeItem("loginUserInfo");
  	state.loginUserInfo = {};
		state.isLogin = false;
  },
	updateStockCircleCid (state, platform) {
		state.stockCircleCid = platform % 2 == 0 ? 2 : 1;
	},
	updateStockCircleTid (state, platform) {
		state.stockCircleTid = platform;
	}
}
