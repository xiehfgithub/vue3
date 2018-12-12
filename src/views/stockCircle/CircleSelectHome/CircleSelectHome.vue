<template>
		<div class="subpage circleSelectHome">
			<HeaderNav title="股票圈首页"></HeaderNav>
			<div class="main" v-if="pageData">
				<div class="title">进入股票圈</div>
				<!--圈子列表-->
				<template v-for="circleItem in pageData">
					<router-link :to="{ name: 'stockCircleTimeline', params: { cid: circleItem.circleId }}" class="enter">
						<img class="enter-logo" :src="circleItem.avatar" />
						<div class="enter-tit">{{circleItem.title}}</div>
						<div class="enter-desc">{{circleItem.summary}}</div>
						<div class="enter-icon"></div>
					</router-link>
				</template>
								
				<div class="followWx-content followWx-content-bottom">
					<!--描述-->
					<div class="followWx-desc">
						建议关注「彩贝股票服务号」<br />
						获取每日提醒服务，投资机会早知道
					</div>
					<img src = "//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_erweima.png"
						alt = "彩贝股票服务号" 
						class="followWx-pic" />
					<div class="dialog-bottomLogo bottomLogo-follow"></div>
				</div>
				<!--底部导航-->
				<div class="footer flex-col before">
					<div class="flex-col-item">
						<a href="https://m.icaibei.net/" class="link">智能选股</a>
					</div>
					<div class="flex-col-item">
						<a href="https://m.icaibei.net/downloadapp.html" class="link font-gold bold">下载APP</a>
					</div>
				</div>
			</div>
						
		</div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue';
export default {
    name: 'circleSelectHome',
    data: function() {
        return {
            pageData: null,
            aaa: '哈哈哈'
        };
    },
    components: {
        HeaderNav
    },
    created: function() {
        this.fnInitData();
    },
    methods: {
        fnFalse: function() {
            return false;
        },
        fnInitData: function() {
            let url = '/API/stockCircle/getCircleSelectHome';
            var that = this;
            that.axios
                .get(url, {
                    params: {},
                    headers: {
                        token: that.$store.state.loginUserInfo.usename
                    }
                })
                .then(function(res) {
                    console.log('axios get模式请求【同$.get】:%O', res.data);
                    that.pageData = res.data.data.dataJson;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/stockCircle-common.less';

.main {
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    overflow: hidden;
    position: relative;
    margin: 0;
    padding: 0;
}
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    padding: 0;
    outline: none;
}
.footer {
    width: 375px;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: #ffffff;
}
.flex-col {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
}
.flex-col-item {
    position: relative;
    display: block;
    font-size: 16px;
    text-align: center;
    line-height: 50px;
    overflow: hidden;
    color: #5a5a5a;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.link {
    display: block;
    width: 100%;
    height: 100%;
    color: #5a5a5a;
}
.flex-col-item:after {
    content: '';
    width: 1px;
    height: 200%;
    background: #e6e6e6;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0 auto;
    -webkit-transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform: scale(0.5);
    transform-origin: 0 0;
}
.flex-col-item:last-of-type:after {
    display: none;
}
.title {
    font-weight: bold;
    font-size: 22px;
    color: #000000;
    letter-spacing: 0;
    height: 62px;
    line-height: 62px;
    padding-left: 15px;
    text-align: left;
}
.enter {
    display: block;
    background: #ffffff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    width: 345px;
    height: 96px;
    margin-bottom: 10px;
    margin-left: 15px;
    background-color: #ffffff;
    box-sizing: border-box;
    padding-left: 75px;
    padding-top: 15px;
    position: relative;
    overflow: hidden;
}
.enter-logo {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 22px;
    left: 15px;
}
.enter-tit {
    color: #333333;
    font-size: 16px;
    height: 17px;
    line-height: 17px;
    margin-bottom: 7px;
    width: 240px;
    overflow-x: hidden;
    font-weight: bold;
    overflow: hidden;
    text-align: left;
}
.enter-desc {
    color: #333333;
    font-size: 13px;
    line-height: 20px;
    width: 240px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.enter-icon {
    position: absolute;
    background: url(//static.cdn.icaibei.net/static/m/images/activity/vip/discount/zf_jinru.png);
    width: 12px;
    height: 12px;
    top: 41px;
    right: 12px;
}

/*底部直接展示关注服务号*/
.bottomLogo-follow {
    width: 226px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_weixiansaoma.png);
}
.followWx-content-bottom {
    top: 0;
    margin-top: 20px;
    background-color: transparent;
}
.followWx-content-bottom .followWx-desc {
    margin-top: 14px;
}
</style>
