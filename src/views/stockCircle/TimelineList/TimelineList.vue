<template>
		<div class="subpage timelineList">		
				<HeaderNav title="股票圈列表" :hasCallBack="true" :callBack="fnGetDomainApiListData"></HeaderNav>
				<!-- 内容Start -->
				<div class="main" v-if="pageData">
					<div class="circle-header after">
							<!--头图区-->
							<div class="circle-info" :style="'background-image: url('+pageData.circle.backImageUrl+')'">
									<a href="https://m.icaibei.net/stockCircle/getCircleSelectHome" class="info-backHome"></a>
									<img :src = "pageData.circle.avatar" alt = "圈子logo" class="info-logo" />
									<div class="info-name bold">
										{{pageData.circle.title}}
									</div>
									<div class="info-change" @click="fnChangeCircle">切换圈子</div>
									<!--圈子信息-->
									<div class="circle-summary clear none">
											<div class = "summary-item" >主题（{{pageData.circle.timelineCount}}）</div >
											<div class = "summary-item" >精华（{{pageData.circle.goodTimelineCount}}）</div >
											<div class = "summary-item" >成员（{{pageData.followUserNumber}}）</div >
									</div>
									<!-- 用户头像-->
									<img v-show="userInfo && userInfo.avatar" :src = "userInfo.avatar" class="info-loginUser" />
							</div>

							<!--顶部操作栏-->
							<div class="flex-col circle-toolbar">
									<div class="flex-col-item">
											<a :href="'https://m.icaibei.net/stockCircle/' + pageData.circle.circleId + '/getCircleSummary?isFromTimelineList=1'" class="link">
													<span class="toolbar-icon toolbar-icon1"></span>
													<span class="toolbar-words">简介</span>
											</a>
									</div>
									<div class="flex-col-item">
											<a :href="'https://m.icaibei.net/stockCircle/' + pageData.circle.circleId + '/getPublish'" class="link">
													<span class="toolbar-icon toolbar-icon2"></span>
													<span class="toolbar-words">发表</span>
											</a>
									</div>
									<div class="flex-col-item" @click="fnChangeFilterTypeChooseStatus">
											<div class="link">
													<span class="toolbar-icon toolbar-icon3"></span>
													<span class="toolbar-words">筛选</span>
													<!--是否有点击操作-->
													<span class="toolbar-icon toolbar-icon4" v-if="filterTypeChooseIsHidden"></span>
													<span class="toolbar-icon toolbar-icon5" v-else></span>
											</div>
									</div>
							</div>
					</div>

					<!--筛选栏-->
					<div class="circle-filter" v-cloak v-show="!filterTypeChooseIsHidden">
							<div class = "filter-type" data-tid="0" @click="fnGetFilterTypeContent($event,0)">全部主题</div >
							<div class = "filter-type" data-tid="1" @click="fnGetFilterTypeContent($event,1)">只看圈主</div >
							<div class = "filter-type" data-tid="4" @click="fnGetFilterTypeContent($event,4)">精华主题</div >
							<div class = "filter-type" data-tid="2" @click="fnGetFilterTypeContent($event,2)">图片主题</div >
							<div class = "filter-type none" data-tid="3" @click="fnGetFilterTypeContent($event,3)">问答主题</div >
					</div>

					<!--内容-->
					<div class="subject-detail" @click="fnGoDetailPage(subjectItem.ctid)" v-for="(subjectItem, subjectIndex) in pageData.circleTimelineVos" :data-index="subjectIndex">
							<!--主题列表-->
							<div class="circle-subject">
									<!--主题用户信息-->
									<img class="subject-avatar" :src = "subjectItem.userAvatar" alt = "主题头像" />
									<div class="icon-anchor" v-show="subjectItem.fromUserStatus == 1"></div>
									<div class="subject-header" :data-userId="subjectItem.userId">
											<!--是否圈主-->
											<div class="header-nick font-orange bold" v-if="subjectItem.fromUserStatus == 1">
													<span>{{subjectItem.userNick}}</span><span class="icon-goodTimeline" title="精华" v-show="subjectItem.timelineGoodStatus"></span><span class="icon-setTop" title="置顶" v-show="subjectItem.stickTop"></span>
											</div>
											<div class="header-nick bold" v-else>
													<span>{{subjectItem.userNick}}</span><span class="icon-goodTimeline" title="精华" v-show="subjectItem.timelineGoodStatus"></span><span class="icon-setTop" title="置顶" v-show="subjectItem.stickTop"></span>
											</div>

											<!--时间-->
											<div class="header-time">
													{{subjectItem.createTime}}
											</div>

											<!--操作权限-->
											<div class="subject-option" @click.stop="fnChangeSubjectToolDetailContent(3,subjectIndex,subjectItem.ctid,subjectItem.timelineGoodStatus,subjectItem.stickTop,subjectItem.userId)" title="特级" v-if="subjectItem.circleTimelineAnchorStatus == 1"></div>
											<div class="subject-option" @click.stop="fnChangeSubjectToolDetailContent(1,subjectIndex,subjectItem.ctid,subjectItem.timelineGoodStatus,subjectItem.stickTop,-1)" title="高级" v-else-if="subjectItem.circleTimelineCreatorStatus == 1"></div>

									</div>

									<!--主题内容-->
									<div class="subject-content" v-html="subjectItem.contentText">
											{{subjectItem.contentText}}
									</div>
									<div class="subject-contentMore" v-show="subjectItem.contentHideStatus">阅读全文</div>

									<!--图片-->
									<div v-if="subjectItem.contentMediaType == 1 && subjectItem.contentMediaUrl.length > 0">
											<div class="subject-pictures subject-pictures-1 none" v-if="subjectItem.contentMediaUrl.length == 0">
													<img src = "https://img.cdn.icaibei.net/avatar/072d9042fc465c11fabe1e67cec1d1d0.jpg!app_user_avatar210" alt = "图片九宫格" />
											</div>
											<div class="subject-pictures subject-pictures-1" v-else-if="subjectItem.contentMediaUrl.length == 1">
													<img :src = "picShowItem" alt = "图片单张" v-for="picShowItem in subjectItem.contentMediaUrl" />
											</div>
											<div class="subject-pictures subject-pictures-24" v-else-if="subjectItem.contentMediaUrl.length == 2 || subjectItem.contentMediaUrl.length == 4">
													<img :src = "picShowItem" alt = "图片四宫格" v-for="picShowItem in subjectItem.contentMediaUrl" />
											</div>
											<div class="subject-pictures" v-else>
													<img :src = "picShowItem" alt = "图片九宫格" v-for="picShowItem in subjectItem.contentMediaUrl" />
											</div>
									</div>

									<!--操作列表-->
									<div class="subject-tools">
											<!--点赞-->
											<span class="tools-icon tools-icon-zan" v-if="!subjectItem.praise" @click.stop="fnChangeZanStatus(true,subjectItem.ctid,subjectIndex)"></span>
											<span class="tools-icon tools-icon-zanEnd" v-else @click.stop="fnChangeZanStatus(false,subjectItem.ctid,subjectIndex)"></span>
											<span class="tools-zanCount"> {{subjectItem.praiseAmount != 0? subjectItem.praiseAmount: ""}}</span>
											<!--评论-->
											<span class="tools-icon tools-icon-comment"></span>
											<span class="tools-commentCount"> {{subjectItem.replyAmount != 0? subjectItem.replyAmount: ""}}</span>
											<!--打赏-->
											<span class="tools-icon tools-icon-sendGift" v-show="subjectItem.rewardVos.length > 0"></span>
											<span class="tools-sendGiftCount" v-show="subjectItem.rewardVos.length > 0"> {{subjectItem.rewardVos.length}}</span>
											<!--分享-->
											<span class="tools-icon tools-icon-share" @click.stop="fnChangeShareStatus"></span>
									</div>

									<!--点赞列表-->
									<div class="subject-zanList" v-show="subjectItem.praiseNicks.length > 0">
											<span class="zanList-icon"></span>
											<template v-for="(praiseNicksItem,praiseNicksIndex) in subjectItem.praiseNicks">
													<span v-if="praiseNicksIndex == 0">{{praiseNicksItem}}</span>
													<span v-else>， {{praiseNicksItem}}</span>
											</template>
											<div style="height: 0.1rem;" v-show="subjectItem.replyVos.length > 0 && subjectItem.replyVos[0].circleTimelineReplies.length == 0"></div>
									</div>

									<!--评论列表-->
									<div class="comment-list" v-show="subjectItem.replyVos.length > 0 && subjectItem.replyVos[0].circleTimelineReplies.length > 0">
											<template  v-for="(replyListItem,replyListIndex) in subjectItem.replyVos" >
													<template  v-for="(replyItem,replyIndex) in replyListItem.circleTimelineReplies" >
															<!--评论内容1-->
															<div class="comment-content comment-content-1" v-if="replyItem.bindReplyId == 0" :data-arg="replyListIndex+'-'+replyItem.circleId+'-'+replyItem.ctid">
																	<!--发言者是否圈主-->
																	<span class="comment-user comment-toReplier comment-anchor" v-if="replyItem.fromUserStatus == 1">{{replyItem.fromUserNick}}</span>
																	<span class="comment-user comment-toReplier" v-else>{{replyItem.fromUserNick}}</span>
																	:
																	<span class="reply-content">
																			{{replyItem.contentMediaUrlList.length>0?"[图片] ":""}}
																			{{replyItem.content}}
																	</span>
															</div>
															<!--评论内容2-->
															<div class="comment-content comment-content-2" v-else  :data-arg="replyListIndex+'-'+replyItem.circleId+'-'+replyItem.ctid">
																	<!--发言者是否圈主-->
																	<span class="comment-user comment-replier comment-anchor" v-if="replyItem.fromUserStatus == 1">{{replyItem.fromUserNick}}</span>
																	<span class="comment-user comment-replier" v-else>{{replyItem.fromUserNick}}</span>
																	回复
																	<!--被回复者是否圈主-->
																	<span class="comment-user comment-toReplier comment-anchor" v-if="replyItem.toUserStatus == 1">{{replyItem.toUserNick}}</span>
																	<span class="comment-user comment-toReplier" v-else>{{replyItem.toUserNick}}</span>
																	:
																	<span class="reply-content">
																			{{replyItem.contentMediaUrlList.length>0?"[图片] ":""}}
																			{{replyItem.content}}
																	</span>
															</div>
													</template >
											</template >

									</div>

							</div>
							<!--右下角发表按钮-->
							<a :href="'/stockCircle/' + pageData.circle.circleId + '/getPublish'" class="fixed-words"></a >

							<!-- 底部关注微信服务号入口-->
							<div class="fixed-followWx before"  @click.stop="fnChangeFollowWxDialogShow" v-show="pageData.subscribeStatus != 1">
									<div class="followWx-cblogo"></div>
									<div class="followWx-words"></div>
									<div class="followWx-rightIcon"></div>
							</div>
					</div>

					<!--分享提示-->
					<div class="share-ts" v-show="shareCoverShow" @click.stop="fnChangeShareStatus"></div>

					<!--单条主题操作-->
					<div class="dialog dialog-subjectToolDetail" v-show="subjectToolDetailShow" @click="fnChangeSubjectToolDetail">
							<!--圈主权限-->
							<div class="subjectToolDetail-content" @click.stop="fnFalse" v-if="subjectToolDetailContentType == 3">
									<!--根据当前条目的状态是否已精华-->
									<div class="subjectToolDetail-item" v-if="!subjectToolDetailContentJH" @click="fnUpdateTimelineGoodStatus(true)">精华</div>
									<div class="subjectToolDetail-item" v-else  @click="fnUpdateTimelineGoodStatus(false)">取消精华</div>
									<!--根据当前条目的状态是否已置顶-->
									<div class="subjectToolDetail-item before" v-if="!subjectToolDetailContentZD" @click="fnUpdateTop(1)">置顶</div>
									<div class="subjectToolDetail-item before" v-else  @click="fnUpdateTop(0)">取消置顶</div>
									<!--删除-->
									<div class="subjectToolDetail-item font-red before" @click="fnSubjectToolDetailDelete">删除</div>
									<!--踢出圈子-->
									<div class="subjectToolDetail-item font-red before" @click="fnSubjectToolDetailAnchorForbid">踢出圈子</div>
									<!--取消-->
									<div class="subjectToolDetail-item subjectToolDetail-item-cancel"  @click="fnChangeSubjectToolDetail">取消</div>
							</div>
							<!--用户对自己观点权限-->
							<div class="subjectToolDetail-content" @click.stop="fnFalse" v-else>
									<div class="subjectToolDetail-item font-red" @click="fnSubjectToolDetailDelete">删除</div>
									<div class="subjectToolDetail-item subjectToolDetail-item-cancel"  @click="fnChangeSubjectToolDetail">取消</div>
							</div>
					</div>

					<!--关注公众号-->
					<div class="dialog-followWx" @click="fnChangeFollowWxDialogShow" v-show="followWxDialogShow">
							<div class="followWx-content" @click.stop="fnFalse">
									<div class="dialog-close" @click="fnChangeFollowWxDialogShow"></div>
									<!--描述-->
									<div class="followWx-desc">
											建议关注「彩贝股票服务号」<br />
											获取每日提醒服务，投资机会早知道
									</div>
									<img src = "//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_erweima.png" alt = "彩贝股票服务号" class="followWx-pic" />
									<div class="dialog-bottomLogo bottomLogo-follow"></div>
							</div>
					</div>

			</div>
			<!--内容End-->
					
		</div>
</template>

<script>
/* 
一开始进去请求的是本地node后端服务提供的数据，点击筛选和右上角按钮可以刷新获取线上真实最新数据 
 */
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue';
export default {
    name: 'timelineList',
    data: function() {
        return {
            pageData: null,
            userInfo: {},
            shareCoverShow: false,
            filterTypeChooseIsHidden: true, //是否显示筛选类型选择面板
            filterType: null, //目前列表数据筛选类型
            subjectToolDetailShow: false, //是否展示单条timeline操作详情面板
            subjectToolDetailContentType: 1, //单条timeline操作详情面板选项内容3：管理，1：自己
            subjectToolDetailContentZD: false, //单条timeline操作详情面板选项是否已置顶
            subjectToolDetailContentJH: 0, //单条timeline操作详情面板选项是否已精华
            loadingMore: true, //判断是否支持上拉刷新
            followWxDialogShow: false
        };
    },
    components: {
        HeaderNav
    },
    created: function() {
		this.$store.commit('updateStockCircleCid', this.$route.params.cid);
        this.fnGetListData();	
    },
    methods: {
        fnFalse: function() {
            return false;
        },
        fnGetListData: function() {
            let cid = this.$store.state.stockCircleCid;
            if (typeof cid == 'number') {
                var that = this;
                let url = '/API/stockCircle/timelineList';
                that.axios
                    .get(url, {
                        params: {
                            id: cid
                        },
                        headers: {
                            token: that.$store.state.loginUserInfo.usename
                        }
                    })
                    .then(function(res) {
                        console.log('获取股票圈%s的数据:%O', cid, res.data);
                        let vmJson = res.data.data;
                        that.pageData = vmJson.dataJson;
                        that.filterType = vmJson.filterType;
                        that.userInfo = that.$store.state.loginUserInfo;
                        //console.log(vmJson);
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
                        refId: 6853,
                        num: 1
                    },
                    headers: {
                        token: that.$store.state.loginUserInfo.usename
                    }
                })
                .then(function(res) {
                    console.log('获取M点赞的数据:%O', res.data);
                    //that.pageData = res.data.data.dataJson;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        fnGetDomainApiListData: function() {
            let url = `/DomainApi/stockCircle/${
                this.$store.state.stockCircleCid
            }/timeline/listFilter`;
            var that = this;
            that.axios
                .get(url, {
                    params: {
                        filterType: that.filterType,
                        desc: 'ineedstockonlinelistdata'
                    },
                    headers: {
                        token: that.$store.state.loginUserInfo.usename
                    }
                })
                .then(function(res) {
                    console.log('获取线上列表数据api接口结果:%O', res.data);
                    if (res.data.status == 0) {
                        let vmJson = res.data;
                        that.pageData = vmJson.data;
                        that.userInfo = that.$store.state.loginUserInfo;
                        that.$toast({ message: '跟新成功', duration: 500 });
                    } else {
                        that.$toast(res.data.msg);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        /*
             * 点击筛选
             * */
        fnChangeFilterTypeChooseStatus: function() {
            this.filterTypeChooseIsHidden = !this.filterTypeChooseIsHidden;
        },
        /*
             * 选择具体筛选类型内容
             * */
        fnGetFilterTypeContent: function(a, type) {
            var that = this;
            console.log('筛选类型【%s】', type);
            //做一次比对当前筛选数据类型，减少请求
            if (that.filterType == type) {
                console.log('相同类型，无需跟换');
            } else {
                /* $.ajax({
                        url:  m_basic_domain + "/stockCircle/" + vmJson.dataJson.circle.circleId + "/timeline/listFilter",
                        data: {
                            filterType: type
                        },
                        type:"get",
                        success: function (e) {
                            if(e.status != 0){
                                alert(e.msg);
                            }else{
                                console.log(e);
                                that.pageData.circleTimelineVos = e.data.circleTimelineVos;
                                //成功后记录跟换当前type类型
                                vmJson.filterType = that.filterType = type;
                            }
                        },
                        err:function (e) {
                            alert(e.msg)
                        }
                    }) */
                that.filterType = type;
                that.fnGetDomainApiListData();
            }

            this.filterTypeChooseIsHidden = true;
        },
        /*
             * 跳转详情页
             * */
        fnGoDetailPage: function(tid) {
            console.log(tid);
            //console.log(this.$router);
            this.$router.push({ path: `/stockCircle/circleDetail/${tid}` });
        },
        /*
             点赞
             */
        fnChangeZanStatus: function(bool, ctid, praiseObjIndex) {
            var that = this;
            let m_basic_domain = 'https://m.icaibei.net';
            let _url;
            console.log(praiseObjIndex);
            if (bool == true) {
                _url = m_basic_domain + 'stockCircle/timeline/addPraise/' + ctid;
                console.log('点赞【%s】', _url);
                that.pageData.circleTimelineVos[praiseObjIndex].praise = true;
                that.pageData.circleTimelineVos[praiseObjIndex].praiseNicks.push(
                    that.$store.state.loginUserInfo.nick
                );
                that.pageData.circleTimelineVos[praiseObjIndex].praiseAmount++;
            } else {
                _url = m_basic_domain + 'stockCircle/timeline/delPraise/' + ctid;
                console.log('取消点赞【%s】', _url);
                that.pageData.circleTimelineVos[praiseObjIndex].praise = false;
                that.pageData.circleTimelineVos[praiseObjIndex].praiseNicks.pop();
                that.pageData.circleTimelineVos[praiseObjIndex].praiseAmount--;
            }

            /* $.ajax({
                    url:  _url,
                    type:"get",
                    success: function (e) {
                        if(e.status != 0){
                            alert(e.msg);
                        }else{
                            console.log(e.data);
                            console.log(that.pageData.circleTimelineVos[praiseObjIndex]);
                            //location.reload(true);
                            //重载点赞用户列表
                            that.pageData.circleTimelineVos[praiseObjIndex].praise = e.data.isPraise;console.log(that.pageData.circleTimelineVos[praiseObjIndex].praise);
                            that.pageData.circleTimelineVos[praiseObjIndex].praiseNicks = e.data.praiseNicks;
                            that.pageData.circleTimelineVos[praiseObjIndex].praiseAmount = e.data.praiseNicks.length;
                        }

                    },
                    err:function (e) {
                        alert(e.msg)
                    }
                }) */
        },
        /*
             * 分享
             * */
        fnChangeShareStatus: function() {
            this.shareCoverShow = !this.shareCoverShow;
        },
        //          ··································详情timeline操作··································
        /*
             * 切换显示状态：详情操作
             * */
        fnChangeSubjectToolDetail: function() {
            this.subjectToolDetailShow = !this.subjectToolDetailShow;
        },
        /*
             *匹配详情操作--记录数据: 置顶=精华=删除=踢出
             * */
        fnChangeSubjectToolDetailContent: function(
            type,
            index,
            ctid,
            jhStatus,
            zdStatus,
            forbidUserId
        ) {
            console.log(
                '权限级别【%s】目录索引:【%s】ID:【%s】是否精华:【%s】是否置顶:【%s】',
                type,
                index,
                ctid,
                jhStatus,
                zdStatus
            );
            vmJson.subjectToolDetail = {
                index: index,
                subjectToolDetailContentType: type,
                subjectToolDetailContentZD: zdStatus,
                subjectToolDetailContentJH: jhStatus,
                ctid: ctid,
                subjectToolDetailForbidUserId: forbidUserId
            };
            this.subjectToolDetailContentType = type;
            this.subjectToolDetailContentZD = zdStatus;
            this.subjectToolDetailContentJH = jhStatus;
            this.subjectToolDetailForbidUserId = forbidUserId;
            console.table(vmJson.subjectToolDetail);
            this.subjectToolDetailShow = true;
        },
        /*
             * 删除
             * */
        fnSubjectToolDetailDelete: function() {
            var that = this;
            console.log('删除%s', vmJson.subjectToolDetail.ctid);
            /* $.ajax({
                    url:  m_basic_domain + "/stockCircle/delCircleDetail/" + vmJson.subjectToolDetail.ctid,
                    type:"get",
                    success: function (e) {
                        if(e.status != 0){
                            alert(e.msg);
                        }else{
                            console.log(e);
                            //that.pageData.circleTimelineVos = e.data.circleTimelineVos;
                            if(vmJson.subjectToolDetail.index == -1){//详情页


                            }else if(vmJson.subjectToolDetail.index >= 0){//timeline页
                                that.pageData.circleTimelineVos.splice(vmJson.subjectToolDetail.index,1);
                            }
                        }

                    },
                    err:function (e) {
                        alert(e.msg)
                    }
                }) */
            //隐藏操作面板
            that.subjectToolDetailShow = false;
        },
        /*
             * 置顶:1/0
             * */
        fnUpdateTop: function(type) {
            var that = this;
            console.log('置顶%s【%s】', vmJson.subjectToolDetail.ctid, type);
            /* $.ajax({
                    url:  m_basic_domain + "stockCircle/timeline/updateTop/" + vmJson.subjectToolDetail.ctid,
                    type:"get",
                    data:{
                        ctidTop: type
                    },
                    success: function (e) {
                        if(e.status != 0){
                            alert(e.msg);
                        }else{
                            console.log(e);
                            that.pageData.circleTimelineVos = e.data.data.circleTimelineVos;

                        }

                    },
                    err:function (e) {
                        alert(e.msg)
                    }
                }) */

            //隐藏操作面板
            that.subjectToolDetailShow = false;
        },
        /*
             * 精华：1/0
             * */
        fnUpdateTimelineGoodStatus: function(type) {
            var that = this;
            /* $.ajax({
                    url:  m_basic_domain + "stockCircle/timeline/updateGoodStatus/" + vmJson.subjectToolDetail.ctid,
                    type:"get",
                    data:{
                        timelineGoodStatus: type
                    },
                    success: function (e) {
                        if(e.status != 0){
                            alert(e.msg);
                        }else{
                            console.log(e.data);
                            that.pageData.circleTimelineVos[vmJson.subjectToolDetail.index].timelineGoodStatus = e.data.timelineGoodStatus;
                        }

                    },
                    err:function (e) {
                        alert(e.msg)
                    }
                }) */

            that.pageData.circleTimelineVos[vmJson.subjectToolDetail.index].timelineGoodStatus =
                type == 1 ? true : false;

            console.log('精华%s【%s】', vmJson.subjectToolDetail.ctid, type);
            //隐藏操作面板
            that.subjectToolDetailShow = false;
        },
        /*
             * 管理员踢出用户
             * */
        fnSubjectToolDetailAnchorForbid: function() {
            var that = this;
            //console.log("待踢出用户ID:【%s】",vmJson.subjectToolDetail.subjectToolDetailForbidUserId);
            var com = confirm(
                '是否踢出ID:' + vmJson.subjectToolDetail.subjectToolDetailForbidUserId
            );
            if (com) {
                var _circleId = that.pageData.circle.circleId;
                /* $.ajax({
                        type:"get",
                        url: m_basic_domain +"stockCircle/" + _circleId +"/" + vmJson.subjectToolDetail.subjectToolDetailForbidUserId,
                        success:function (e) {
                            console.log(e.data);
                            that.pageData.circleTimelineVos = e.data.data.circleTimelineVos;
                        },
                        error:function (err) {
                            alert(err.msg);
                        }
                    }); */

                //隐藏操作面板
                that.subjectToolDetailShow = false;
            } else {
                //alert("取消");
            }
        },
        /*
            * 监听上拉滚动到底事件
            * */
        fnHandleScroll: function() {
            if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                console.log('是否还能上拉加载更多【%s】', this.loadingMore);
                if (this.loadingMore) {
                    this.fnGetProList();
                }
            }
        },
        /*
             * 上拉加载更多
             * */
        fnGetProList: function() {
            var that = this;
            var _lastTid =
                that.pageData.circleTimelineVos[that.pageData.circleTimelineVos.length - 1].ctid;
            $.ajax({
                url:
                    m_basic_domain +
                    '/stockCircle/' +
                    vmJson.dataJson.circle.circleId +
                    '/timeline/listFilter',
                data: {
                    filterType: that.filterType,
                    lastTid: _lastTid
                },
                type: 'get',
                success: function(e) {
                    if (e.status != 0) {
                        alert(e.msg);
                    } else {
                        console.log(e);
                        if (e.data.circleTimelineVos && e.data.circleTimelineVos.length > 0) {
                            for (var i = 0; i < e.data.circleTimelineVos.length; i++) {
                                that.pageData.circleTimelineVos.push(e.data.circleTimelineVos[i]);
                            }
                        } else {
                            //没更多数据了阻止下次请求
                            that.loadingMore = false;
                        }
                    }
                },
                err: function(e) {
                    alert(e.msg);
                }
            });
        },
        /*
             * 关注服务号
             * */
        fnChangeFollowWxDialogShow: function() {
            if (!this.checkLogin()) return false;
            this.followWxDialogShow = !this.followWxDialogShow;
        },
        /*
             * 登录检查
             * */
        checkLogin: function() {
            if (!vmJson.loginUser) {
                this.$store.dispatch('login');
                return false;
            } else {
                return true;
            }
        },
		fnChangeCircle: function(){
			let cid = this.$store.state.stockCircleCid == 1?2:1;
			this.$router.push({path: `/stockCircle/timelineList/${cid}`});
		}
    },	
	beforeRouteEnter :(to, from, next) => {
		// 在渲染该组件的对应路由被 confirm 前调用
		// 不！能！获取组件实例 `this`
		// 因为当守卫执行前，组件实例还没被创建
		console.log("+++++++++++stockCircleTimeline_router路由守卫Enter++++++++++++++");		
		
		console.log(`方式2:组件内加beforeRouteEnter守卫:列表页进入前守卫检查登录信息`);	
		next(vm => {
			// 通过 `vm` 访问组件实例··· 且这里next的逻辑处理会在created什么周期之后			
		}); 
		
	},
	beforeRouteUpdate (to, from, next) {
		// 在当前路由改变，参数或查询的改变并不会触发进入/离开的导航守卫,但是该组件被复用时调用
		// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
		// 可以访问组件实例 `this`
		console.log("+++++++++++stockCircleTimeline_router路由守卫Update++++++++++++++");
		//路径参数切换但是共用同组件--先切换请求参数
		this.$store.commit('updateStockCircleCid', to.params.cid);
		this.fnGetListData();
		next();
	},
	beforeRouteLeave (to, from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`
		//  一定要调用该next来 resolve 这个钩子，可以用next(false)取消这个路由切换
		console.log("+++++++++++stockCircleTimeline_router路由守卫Leave++++++++++++++");
		next();
	},
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/stockCircle-common.less';	

.main {
    box-sizing: border-box;
    padding-bottom: 106px;
}
.circle-subject {
    padding-bottom: 10px;
}
.subject-zanList {
    padding-bottom: 0;
}
/*timeline*/
.circle-header {
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
}
.circle-info {
    height: 158px;
    position: relative;
    overflow: hidden;
}
.info-backHome {
    display: block;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    left: 12px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_huishouye.png);
}
.info-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 38px auto 10px;
}
.info-name {
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    line-height: 16px;
}
.circle-summary {
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 100%;
    box-sizing: border-box;
    padding-right: 5px;
    color: #ffffff;
    padding-top: 16px;
}
.summary-item {
    float: right;
    display: inline;
    padding-left: 10px;
    padding-right: 10px;
    color: #e06363;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    margin-bottom: 7px;
    line-height: 20px;
    box-sizing: border-box;
    text-align: right;
}

/*顶部操作栏*/
.circle-toolbar {
    position: relative;
}
.circle-toolbar .flex-col-item {
    margin: 12px 0;
}
.circle-toolbar .link {
    line-height: 16px;
}
.toolbar-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 3px;
}
.toolbar-icon1 {
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_jianjie.png);
}
.toolbar-icon2 {
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_fabiao.png);
}
.toolbar-icon3 {
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_shaixuan.png);
}
.toolbar-icon4 {
    width: 7px;
    height: 15px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_zhankai.png);
}
.toolbar-icon5 {
    width: 7px;
    height: 15px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_shouqi.png);
}
.toolbar-words {
    display: inline-block;
    font-size: 15px;
    color: #333333;
    vertical-align: middle;
}
/*回复内容*/
.comment-list {
    padding: 10px;
    margin: 0 20px;
    background-color: #fafafa;
}
.comment-content:first-of-type {
    margin-top: 0;
}
/*筛选栏*/
.circle-filter {
    width: 120px;
    padding: 12px 0;
    background-color: #ffffff;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    position: absolute;
    z-index: 1;
    top: 197px;
    right: 5px;
}
.filter-type {
    font-size: 15px;
    color: #333333;
    line-height: 39px;
    text-align: center;
}
.share-ts {
    width: 100%;
    height: 736.3px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wangjing/fenxiang_right.png);
    background-size: 100% 100% !important;
}
/*展示6行*/
.subject-content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
}
.subject-contentMore {
    font-size: 15px;
    line-height: 22px;
    color: #333333;
    padding: 0 20px;
    text-align: right;
    color: #5882b2;
}
.fixed-words {
    display: block;
    width: 50px;
    height: 50px;
    position: fixed;
    z-index: 1;
    right: 15px;
    bottom: 55px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/fixed-words.png);
    border-radius: 50%;
    overflow: hidden;
}
.comment-content {
    font-size: 15px;
    line-height: 20px;
    color: #666666;
}
.info-loginUser {
    display: block;
    width: 35px;
    height: 35px;
    position: absolute;
    top: 15px;
    right: 17px;
    border-radius: 50%;
}
.bottomLogo-follow {
    width: 226px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_weixiansaoma.png);
}
.info-change{
	color: crimson;
	text-align: center;
	line-height: 24px;
}
</style>
