<template>
	<div class="pageLoading">
		<img class="icon-loading" src="../../assets/xhf.png" alt="loading">
		
	</div>
</template>

<script>
export default {
    name: 'pageLoading',
    data: function() {
        return {};
    },
    components: {},
    created: function() {},
    methods: {}
};
</script>

<style lang="less" scoped>
	.pageLoading{
		width: 100%;
		min-height: 400px;
		position: relative;
		.icon-loading{
			display: block;
			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			transform: translateY(-50%);
			margin: 0 auto;
			width: 100px;
			height: auto;
		}
	}
</style>
