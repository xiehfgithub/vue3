<template>
	<transition name="slide-rightIn">
		<div class="subpage circleDetail">
			<HeaderNav  :title="'股票圈详情'+this.$store.state.stockCircleTid" :hasCallBack="true" :callBack="fnGetDomainApiDetailData" />
			<PageNull v-if="!pageData" />
			<div class="content" v-else>
				<template v-if="$store.state.debug">
					<br>
					<br>
					<button @click="fnGetDomainM">M站代理</button>
					<br>
					<br>
					<button @click="fnGetDomainApiDetailData">API站代理</button>
					<br>
					<br>
				</template>
				{{pageData}}
			</div>
		</div>
		</transition>
</template>

<script>
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue';
import PageNull from '@/components/PageNull/PageNull.vue';
export default {
    name: 'circleDetail',
    data: function() {
        return {
            pageData: null
        };
    },
    components: {
        HeaderNav,
        PageNull
    },
    created: function() {
		this.$store.commit("updateStockCircleTid",this.$route.params.tid);	
        this.fnInitData();
		//this.fnGetDomainApiDetailData()
    },
    methods: {
        fnFalse: function() {
            return false;
        },
        fnInitData: function() {
            let tid = this.$route.params.tid % 2 == 0 ? 2 : 1;
            let url = '/API/stockCircle/getCircleDetail';
            var that = this;
            if (typeof tid == 'number') {
                that.axios
                    .get(url, {
                        params: {
                            tid: tid
                        },
                        headers: {
                            token: that.$store.state.loginUserInfo.usename
                        }
                    })
                    .then(function(res) {
                        console.log('获取股票圈详情%s的数据:%O', tid, res.data);
                        let vmJson = res.data.data;
                        that.pageData = vmJson.dataJson;
                        that.BInitData = false;
                        console.log(vmJson);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        },
        fnGetDomainM: function() {
            let url = '/DomainM/praise/post';
            var that = this;
            that.axios
                .get(url, {
                    params: {
                        refType: 'reply',
                        refId: that.tid,
                        num: 1
                    },
                    headers: {
                        token: that.$store.state.loginUserInfo.usename
                    }
                })
                .then(function(res) {
                    console.log('获取评论【%s】的数据:%O', that.tid, res.data);
                    //that.pageData = res.data.data.dataJson;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        fnGetDomainApiDetailData: function() {
            let url = `/DomainApi/stockCircle/getCircleDetail/${this.$store.state.stockCircleTid}`;
            var that = this;
            that.axios
                .get(url, {
                    params: {
                        desc: 'ineedstockonlinedetaildata'
                    },
                    headers: {
                        token: that.$store.state.loginUserInfo.usename
                    }
                })
                .then(function(res) {
                    console.log('获取线上详情数据api接口结果:%O', res.data);
										if(res.data.status == 0){
											let vmJson = res.data;
											that.pageData = vmJson.data;
											that.$toast({message:'跟新成功',duration:500});
										}else{
											that.$toast(res.data.msg);
										}
										
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="less" scoped>
.content {
    color: red;
}
</style>
