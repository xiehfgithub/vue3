<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive">
				<!-- 这里是会被缓存的视图组件！ -->
			</router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive">
			<!-- 这里是不被缓存的视图组件！ -->
		</router-view>

	</div>
</template>

<style lang="less">
@import './assets/common.less';
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100vw;
		height: 100vh;
    position: relative;
		max-width: 375px;
		margin: 0 auto;
}

#nav {
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
<script type="text/javascript">
export default {
    name: 'home',
    components: {},
    created: function() {
        // console.log("VueX:",this.$store.state);
        // console.log("Axios:",axios);
        // console.log(this);

        // mint-ui js控件使用
        /* this.$toast({
			  message: 'Mint-ui提示语句',
			  position: 'middle',
			  duration: 5000
			}) */
        /* this.$messagebox({
          title: '温馨提示',
          message: '订单支付成功',
          showCancelButton: true,
          confirmButtonText:"继续购物",
          cancelButtonText:"查看订单"
        }).then(action => {
          if(action == 'confirm'){
            console.log('继续购物')
          }else{
            console.log('查看订单')
          }
      }) */
        this.$store.commit('checkLogin');
        //设置cookie模拟请求test.m.icaibei.net线上
        document.cookie =
            'CAIBEI_LOGIN=TyupjZ33CLLpskjzy4PgvFfQvfMqFBxTgTtdbVveUdI%3D;path=/;expires=2019-12-01T09:29:57.000Z';
    }
};
</script>
