<!--导航栏组件-->
<template>
	<div class="headerNav">
		<header class="mint-header">
			<div class="mint-header-button is-left">
					<button class="mint-button mint-button--default mint-button--normal" @click="goBack">
						<span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
						<label class="mint-button-text">返回</label>
					</button>
			</div>
			<h1 class="mint-header-title">{{title?title:"默认标题"}}</h1>
			<div class="mint-header-button is-right">
				<button class="mint-button mint-button--default mint-button--normal" v-show="hasCallBack" @click="callBack">
					<span class="mint-button-icon"><i class="mintui mintui-more"></i></span>
					<label class="mint-button-text"></label>
				</button>
			</div>
		</header>

    </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  data: function () {
    return {
      
    }
  },
  props: {
		title: {
			type: String,
			default: "彩贝股票圈",
			required: false
		},
		hasCallBack: {
			type: Boolean,
			default: false,
			required: false
		},
		callBack: {
			type: Function,
			default: function callBack(e){
				
			},
			required: false
		}
  },
  created: function () {
    //console.log(this.$route);
  },
	methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/index')
    }
  }
}
</script>

<style scoped lang="less">
	.headerNav{
		width: 100%;
		padding: 0;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		overflow: hidden;
	}

</style>
