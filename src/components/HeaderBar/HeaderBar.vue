<!--首页顶部：仿起点中文网头-->
<template>
	<div id="nav">
		<div class="title">
			<img class="logo" src="@/assets/xhf.png" />
			海锋叉叉网
		</div>
      	<div class="flex-sex">
      		<div :class="{
      			'flex-sex-item': true,
      			'flex-sex-item-act': $store.state.headerBarPage.sexIndexAct == 1
      		}" @click="ChangeHeaderBarPage_sexIndexAct(1)">男生</div>
      		<!--<div :class="{
      			'flex-sex-item': true,
      			'flex-sex-item-act': $store.state.headerBarPage.sexIndexAct == 1
      		}" @click="$store.dispatch('ChangeHeaderBarPage_sexIndexAct',1)">男生</div>
      		<div :class="{
      			'flex-sex-item': true,
      			'flex-sex-item-act': $store.state.headerBarPage.sexIndexAct == 2
      		}" @click="$store.commit('ChangeHeaderBarPage_sexIndexAct',2)">男生</div>-->
      		<div :class="{
      			'flex-sex-item': true,
      			'flex-sex-item-act': $store.state.headerBarPage.sexIndexAct == 0
      		}" @click="$store.dispatch('ChangeHeaderBarPage_sexIndexAct',0)">女生</div>
      	</div>
      	<!--登录-->
      	<div class="login-box">
      		<template v-if="$store.state.loginUserInfo.nick">
	      		<div class="login-user">欢迎：{{$store.state.loginUserInfo.nick}}</div>
		      	<div class="loginOut" @click="$store.commit('loginOut')">退出</div>
      		</template>
	      	<div class="login" v-else @click="$store.dispatch('login')">登录</div>
      	</div>
      	
    </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data: function () {
    return {

    }
  },
  props: {

  },
  created: function () {
    //console.log(this.$route)
    //console.log(this.$store)
    console.log('================HeaderBar==================');
  },
	mounted:function(){
		/* if(this.$route.query.redirect != undefined && typeof this.$store.state.loginUserInfo.userId == "undefined"){				
			let com = confirm("未登录是否进行登录？");
			if(com){
				this.$router.push(""+this.$route.query.redirect)
			}else{
				
			}			
		}		 */
	},
  methods: {
    ChangeHeaderBarPage_sexIndexAct: function (type) {
      	this.$store.dispatch("ChangeHeaderBarPage_sexIndexAct",type);
    }
  }
}
</script>

<style scoped lang="less">
	#nav{
		height: 44px;
		position: relative;
		background-color: #ccc;
		padding-left: 130px;
		padding-top: 7px;
		box-sizing: border-box;
	}
	.title{
		width: 100px;
		height: 34px;
		position: absolute;
		top: 5px;
		left: 0;
		color: transparent;
	}
	.logo{
		display: block;
		height: 100%;
	}
	.flex-sex{
		display: flex;
		justify-content: space-between;
		width: 100px;
		height: 24px;
		border: 1PX solid orangered;
		border-radius: @borderradius;
		overflow: hidden;
		color:orangered;
		text-align:center;
		.flex-sex-item{
			flex: 1;
			height: 100%;
			line-height: 24px;
		}
		.flex-sex-item-act{
			background-color: orangered;
			color:#fff;
		}
	}
	.login-box{
		width: 130px;
		height: 34px;
		line-height: 34px;
		position: absolute;
		top: 5px;
		right: 0.1rem;
		text-align: right;
		.login-user{
			display: inline-block;
			width: 90px;
			color: #FE6D18;
		}
		.login,.loginOut{
			display: inline-block;
			width: 40px;
			text-align: center;
		}
	}
</style>
