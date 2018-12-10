<template>
	<div class="index">
		<HeaderBar></HeaderBar>
		<mt-swipe class="index-swiper borderbot-1" @change="handleChange" :auto="20000" :speed="1000" :defaultIndex="0" :stopPropagation="true">
			<mt-swipe-item>
				<img alt="Vue logo" v-lazy="'https://img.cdn.icaibei.net/banner/201812/f50ba05c5442c7bc0d89c891afdb385f.png!app_banner1'" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" v-lazy="'https://img.cdn.icaibei.net/banner/201808/96295cd72a5a9a6b5f3b568dc43c4b80.png!app_banner1'" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" v-lazy="'https://img.cdn.icaibei.net/avatar/201807/ab3f8116d86d53857283da54e4f9fe45.png!app_banner1'" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" v-lazy="'https://img.cdn.icaibei.net/banner/201805/d821e2899d3ae2e24cbbe0182d2f9436.png!app_banner1'" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" v-lazy="'https://img.cdn.icaibei.net/banner/201804/7e2095eba1128b50137f6dd49c94ea3d.jpg!app_banner1'" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" v-lazy="imgLazy" />
			</mt-swipe-item>
		</mt-swipe>
		目录：
		<br /><br />
		<router-link to="/stockCircle/circleSelectHome">股票圈首页circleSelectHome</router-link>
		<br /><br />		
		<router-link to="/stockCircle/timelineList/aaa">股票圈列表timelineList-aaa</router-link>
		<br /><br />		
		<router-link to="/stockCircle/timelineList/1">股票圈列表timelineList-1</router-link>
		<br /><br />		
		<router-link to="/stockCircle/timelineList/2">股票圈列表timelineList-2</router-link>
		<br /><br />
		<router-link to="/stockCircle/circleDetail/111110">股票圈详情circleDetail-111110</router-link>
		<br /><br />
		<router-link to="/stockCircle/circleDetail/111111">股票圈详情circleDetail-111111</router-link>
		<br /><br />
		
		
		<router-view></router-view>
	</div>
</template>

<style lang="less" scoped>
.index-swiper {
    width: 100%;
    height: 106px;
    height: 126px;
}
/*用/deep/穿透scoped修改UI框架默认值*/
.index-swiper /deep/ .mint-swipe-indicator.is-active {
    background: #ffa42f;
    opacity: 0.5;
}
.desc {
    font-size: 15px;
    color: @color;
}
.goods-list {
    background: @buttombg;
}
.line3 {
    .textLine(4);
}
</style>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import _img from '@/assets/xhf.png'; // 懒加载图片
export default {
    name: 'index',
    data: function() {
        return {
            pageData: 0,
            img:
                'https://img.cdn.icaibei.net/avatar/072d9042fc465c11fabe1e67cec1d1d0.jpg!app_user_avatar210',
            imgLazy: _img
        };
    },
    components: {
        HeaderBar
    },
    created: function() {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~Index.vue~~~~~~~~~~~~~~~~~~~~~~~~~~');

        console.log("全局配置数据%O",this.base);
    },
    methods: {
        handleChange(index) {
            // console.log(index)
        }
    }
};
</script>
