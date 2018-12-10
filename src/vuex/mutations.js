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
	checkLogin (state, platform) {
		if(localStorage.loginUserInfo && JSON.parse(localStorage.loginUserInfo).nick){	
			state.loginUserInfo = JSON.parse(localStorage.loginUserInfo);
			console.log("有登录信息");
			return true
		}else{
			console.log("无登录信息");
			return false
		}
	},
  login (state, platform) {
    localStorage.loginUserInfo = JSON.stringify(platform);  	
		state.loginUserInfo = platform;
  },
  loginOut (state, platform) {
  	localStorage.removeItem("loginUserInfo");
  	state.loginUserInfo = {};
  },
	updateStockCircleCid (state, platform) {
		state.stockCircleCid = platform % 2 == 0 ? 2 : 1;
	},
	updateStockCircleTid (state, platform) {
		state.stockCircleTid = platform;
	}
}
