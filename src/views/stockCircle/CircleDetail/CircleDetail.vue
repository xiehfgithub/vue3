<template>
	<transition name="slide-rightIn">
		<div class="subpage circleDetail">
			<HeaderNav  :title="'股票圈详情'+this.$store.state.stockCircleTid" :hasCallBack="true" :callBack="fnGetDomainM" />
			<PageNull v-if="!pageData" />
			<div class="content" v-else>
				<template v-if="!$store.state.debug">
					<br>
					<br>
					<button @click="fnGetDomainM">M站代理</button>
					<br>
					<br>
					<button @click="fnGetDomainM">API站代理</button>
					<br>
					<br>
				</template>
				<div class="pageCircleDetail">
						<!--详情-->
						<div v-if="contentShow">
							<!--返回列表-->
							<div class="header-nav after">
								<a class="icon-back" :href="'/stockCircle/' + pageData.circleId + '/timeline/list'">
									<div class="icon-back-icon"></div>返回
								</a>
								{{pageData.circleTitle}}
							</div>

							<!--详情内容-->
							<div class="subject-detail">
								<div class="circle-subject">
									<img class="subject-avatar" :src = "pageData.userAvatar" alt = "主题头像" />
									<div class="icon-anchor" v-show="pageData.fromUserStatus == 1"></div>
									<div class="subject-header" :data-userId="pageData.userId">
										<!--是否圈主-->
										<div class="header-nick font-orange bold" v-if="pageData.fromUserStatus == 1">
											<span>{{pageData.userNick}}</span><span class="icon-goodTimeline" title="精华" v-show="pageData.timelineGoodStatus"></span><span class="icon-setTop" title="置顶" v-show="pageData.stickTop"></span>
										</div>
										<div class="header-nick bold" v-else>
											<span>{{pageData.userNick}}</span><span class="icon-goodTimeline" title="精华" v-show="pageData.timelineGoodStatus"></span><span class="icon-setTop" title="置顶" v-show="pageData.stickTop"></span>
										</div>

										<!--时间-->
										<div class="header-time">{{pageData.createTime}}</div>

										<!--操作权限-->
										<div class="subject-option" @click.stop="fnChangeSubjectToolDetailContent(3,-1,pageData.ctid,pageData.timelineGoodStatus,pageData.stickTop,pageData.userId)" title="特级" v-if="pageData.circleTimelineAnchorStatus == 1"></div>
										<div class="subject-option" @click.stop="fnChangeSubjectToolDetailContent(1,-1,pageData.ctid,pageData.timelineGoodStatus,pageData.stickTop,-1)" title="高级" v-else-if="pageData.circleTimelineCreatorStatus == 1"></div>

									</div>

									<!--已解锁权限-->
									<template v-if="pageData.unLockStatus == 0">
										<!--内容-->
										<div class="subject-content" v-html="pageData.contentText"></div>

										<!--图片-->
										<div v-if="pageData.contentMediaType == 1 && pageData.contentMediaUrl.length > 0">
											<div class="subject-pictures subject-pictures-1 none" v-if="pageData.contentMediaUrl.length == 0">
												<img src = "https://img.cdn.icaibei.net/avatar/072d9042fc465c11fabe1e67cec1d1d0.jpg!app_user_avatar210" alt = "图片九宫格" />
											</div>
											<div class="subject-pictures subject-pictures-1" v-else-if="pageData.contentMediaUrl.length == 1">
												<img :src = "picShowItem" alt = "图片单张" v-for="picShowItem in pageData.contentMediaUrl" />
											</div>
											<div class="subject-pictures subject-pictures-24" v-else-if="pageData.contentMediaUrl.length == 2 || pageData.contentMediaUrl.length == 4">
												<img :src = "picShowItem" alt = "图片四宫格" v-for="picShowItem in pageData.contentMediaUrl" />
											</div>
											<div class="subject-pictures" v-else>
												<img :src = "picShowItem" alt = "图片九宫格" v-for="picShowItem in pageData.contentMediaUrl" />
											</div>
										</div>

										<!--操作列表-->
										<div class="detail-tools" v-if="pageData.unLockStatus == 0">
											<div class="detail-tools-zan" @click="fnChangeZanStatus(true)" v-if="!pageData.praise"></div>
											<div class="detail-tools-zanEnd" @click="fnChangeZanStatus(false)" v-else></div>
											<!-- 打赏 -->
											<div class="detail-tools-sendGift" @click="fnChangeDialogSendGiftShow" v-show="pageData.fromUserStatus"></div>
										</div>
									</template>
									<template v-else>
										<!--内容-->
										<div class="subject-content-box">
											<div class="subject-content" v-html="pageData.contentText"></div>
											<div class="block-cover"></div>
										</div>
										<!--解锁-->
										<div class="detail-deblock">
											<div class="btn-deblock" @click="fnDialogDeblockShow"></div>
										</div>
									</template>

									<!--点赞列表-->
									<div class="subject-zanList" v-show="pageData.praiseNicks.length > 0">
										<span class="zanList-icon"></span>
										<template v-for="(praiseNicksItem,praiseNicksIndex) in pageData.praiseNicks">
											<span v-if="praiseNicksIndex == 0">{{praiseNicksItem}}</span>
											<span v-else>， {{praiseNicksItem}}</span>
										</template>
									</div>

									<!--回复当前详情入口-->
									<div class="detail-comment">
										<div style="height: 0.1rem;" v-show="pageData.praiseNicks.length == 0"></div>
										<div class="comment-enterShow" @click="fnGoComment(pageData.userId, 0, pageData.userId, '', '',-1,0,0)">评论···</div>
									</div>

									<!--打赏列表-->
									<div class="subject-sendGiftList" v-show="pageData.rewardVos.length > 0 && pageData.fromUserStatus">
										<div class="subject-sendGiftList-item" v-for="(rewardItem,rewardIndex) in pageData.rewardVos">
											<span class="sendGiftList-item-avatar" :style="'background-image: url(' + rewardItem.userAvatar + ')'"></span>
											<span class="font-orange">{{rewardItem.userNick}}  打赏了{{rewardItem.price | formatNum(0.1) }}元</span>
										</div>
									</div>

								</div>
							</div>
							<!--评论-->
							<div class="subject-comment" v-show="commentJson && commentJson.length > 0">
								<div class="comment-count">评论（{{commentJson.length}}）</div>
								<div class="comment-list">
									<div class = "comment-item before" v-for="(replyListItem,replyListIndex) in commentJson">
										<!--1：初始评论用户-->
										<div class="comment-top"
											 @click="fnGoComment(replyListItem.replyMasterVo.fromUserId, replyListItem.replyMasterVo.replyId, replyListItem.replyMasterVo.fromUserId, replyListItem.replyMasterVo.fromUserNick, replyListItem.replyMasterVo.fromUserNick,replyListIndex,replyListItem.replyMasterVo.replyId,replyListItem.replyMasterVo.toReplyId)"
											 :data-bindReplyId="replyListItem.replyMasterVo.replyId"
											 :data-toUserId="replyListItem.replyMasterVo.fromUserId"
											 :data-index= "replyListIndex"
												>
											<img class="subject-avatar comment-avatar" :src="replyListItem.replyMasterVo.fromUserAvatar" alt="主题头像">
											<div class="subject-header comment-header">
												<!--是否圈主-->
												<div class="header-nick font-orange bold" v-if="replyListItem.replyMasterVo.fromUserStatus == 1">{{replyListItem.replyMasterVo.fromUserNick}}</div>
												<div class="header-nick bold" v-else>{{replyListItem.replyMasterVo.fromUserNick}}</div>
												<!--时间-->
												<div class="header-time">{{replyListItem.replyMasterVo.createTime}}</div>
											</div>
											<!--评论主题-->
											<div class="comment-topic">{{replyListItem.replyMasterVo.content}}</div>

											<!--评论附带图片1-->
											<div v-if="replyListItem.replyMasterVo.contentMediaType == 1 && replyListItem.replyMasterVo.contentMediaUrlList && replyListItem.replyMasterVo.contentMediaUrlList.length > 0">
												<div class="subject-pictures subject-pictures-1 none" v-if="replyListItem.replyMasterVo.contentMediaUrlList.length == 0">
													<img src = "https://img.cdn.icaibei.net/avatar/072d9042fc465c11fabe1e67cec1d1d0.jpg!app_user_avatar210" alt = "图片九宫格" @click.stop="fnStop" />
												</div>
												<div class="subject-pictures subject-pictures-1" v-else-if="replyListItem.replyMasterVo.contentMediaUrlList.length == 1">
													<img :src = "replyItemPicShowItem1" alt = "图片单张" v-for="replyItemPicShowItem1 in replyListItem.replyMasterVo.contentMediaUrlList" @click.stop="fnStop" />
												</div>
												<div class="subject-pictures subject-pictures-24" v-else-if="replyListItem.replyMasterVo.contentMediaUrlList.length == 2 || replyListItem.replyMasterVo.contentMediaUrlList.length == 4">
													<img :src = "replyItemPicShowItem1" alt = "图片四宫格" v-for="replyItemPicShowItem1 in replyListItem.replyMasterVo.contentMediaUrlList" @click.stop="fnStop" />
												</div>
												<div class="subject-pictures" v-else>
													<img :src = "replyItemPicShowItem1" alt = "图片九宫格" v-for="replyItemPicShowItem1 in replyListItem.replyMasterVo.contentMediaUrlList" @click.stop="fnStop" />
												</div>
											</div>
											<!--<div><div class="subject-pictures subject-pictures-24"><img src="https://img.cdn.icaibei.net/circleTimeline/ead21f1bddec4b5c7d9d099f01e57c15.png" alt="图片四宫格"><img src="https://img.cdn.icaibei.net/circleTimeline/ead21f1bddec4b5c7d9d099f01e57c15.png" alt="图片四宫格"><img src="https://img.cdn.icaibei.net/circleTimeline/ead21f1bddec4b5c7d9d099f01e57c15.png" alt="图片四宫格"><img src="https://img.cdn.icaibei.net/circleTimeline/8c4ec8bf19dad443ad9488f160d638b9.png" alt="图片四宫格"></div></div>-->
										</div>

										<!--2：后续评论用户-->
										<div class="comment-bg" v-show="replyListItem.replyChildVos && replyListItem.replyChildVos.length > 0">
											<template  v-for="(replyItem,replyIndex) in replyListItem.replyChildVos" >
												<!--评论内容1-->
												<div class="comment-content comment-content-1" v-if="replyItem.fromUserId == replyItem.toUserId" @click="fnGoComment(replyItem.fromUserId, replyListItem.replyMasterVo.replyId, replyItem.toUserId, replyItem.fromUserNick, replyItem.fromUserNick,replyListIndex,replyItem.replyId,replyItem.toReplyId)" :data-toUserId="replyItem.fromUserId" :data-bindReplyId="replyListItem.replyMasterVo.replyId">
													<!--发言者是否圈主-->
													<span class="comment-user comment-toReplier comment-anchor" v-if="replyItem.fromUserStatus == 1">{{replyItem.fromUserNick}}</span>
													<span class="comment-user comment-toReplier" v-else>{{replyItem.fromUserNick}}</span>
													:
													<span class="reply-content">{{replyItem.content}}</span>

													<!--评论附带图片2-->
													<div v-if="replyItem.contentMediaType == 1 && replyItem.contentMediaUrlList && replyItem.contentMediaUrlList.length > 0">
														<div class="subject-pictures subject-pictures-1 none" v-if="replyItem.contentMediaUrlList.length == 0">
															<img src = "https://img.cdn.icaibei.net/avatar/072d9042fc465c11fabe1e67cec1d1d0.jpg!app_user_avatar210" alt = "图片九宫格" />
														</div>
														<div class="subject-pictures subject-pictures-1" v-else-if="replyItem.contentMediaUrlList.length == 1">
															<img :src = "replyItemPicShowItem2" alt = "图片单张" v-for="replyItemPicShowItem2 in replyItem.contentMediaUrlList"  @click.stop="fnStop" />
														</div>
														<div class="subject-pictures subject-pictures-24" v-else-if="replyItem.contentMediaUrlList.length == 2 || replyItem.contentMediaUrlList.length == 4">
															<img :src = "replyItemPicShowItem2" alt = "图片四宫格" v-for="replyItemPicShowItem2 in replyItem.contentMediaUrlList"  @click.stop="fnStop" />
														</div>
														<div class="subject-pictures" v-else>
															<img :src = "replyItemPicShowItem2" alt = "图片九宫格" v-for="replyItemPicShowItem2 in replyItem.contentMediaUrlList"  @click.stop="fnStop" />
														</div>
													</div>

												</div>
												<!--评论内容2-->
												<div class="comment-content comment-content-2" v-else  @click="fnGoComment(replyItem.fromUserId, replyListItem.replyMasterVo.replyId, replyItem.toUserId, replyItem.fromUserNick, replyItem.toUserNick,replyListIndex,replyItem.replyId,replyItem.toReplyId)" :data-toUserId="replyItem.fromUserId" :data-bindReplyId="replyListItem.replyMasterVo.replyId">
													<!--发言者是否圈主-->
													<span class="comment-user comment-replier comment-anchor" v-if="replyItem.fromUserStatus == 1">{{replyItem.fromUserNick}}</span>
													<span class="comment-user comment-replier" v-else>{{replyItem.fromUserNick}}</span>
													回复
													<!--被回复者是否圈主-->
													<span class="comment-user comment-toReplier comment-anchor" v-if="replyItem.toUserStatus == 1">{{replyItem.toUserNick}}</span>
													<span class="comment-user comment-toReplier" v-else>{{replyItem.toUserNick}}</span>
													:
													<span class="reply-content">{{replyItem.content}}</span>

													<!--评论附带图片2-->
													<div v-if="replyItem.contentMediaType == 1 && replyItem.contentMediaUrlList && replyItem.contentMediaUrlList.length > 0" >
														<div class="subject-pictures subject-pictures-1 none" v-if="replyItem.contentMediaUrlList.length == 0">
															<img src = "https://img.cdn.icaibei.net/avatar/072d9042fc465c11fabe1e67cec1d1d0.jpg!app_user_avatar210" alt = "图片九宫格" @click.stop="fnStop" />
														</div>
														<div class="subject-pictures subject-pictures-1" v-else-if="replyItem.contentMediaUrlList.length == 1">
															<img :src = "replyItemPicShowItem2" alt = "图片单张" v-for="replyItemPicShowItem2 in replyItem.contentMediaUrlList" @click.stop="fnStop" />
														</div>
														<div class="subject-pictures subject-pictures-24" v-else-if="replyItem.contentMediaUrlList.length == 2 || replyItem.contentMediaUrlList.length == 4">
															<img :src = "replyItemPicShowItem2" alt = "图片四宫格" v-for="replyItemPicShowItem2 in replyItem.contentMediaUrlList" @click.stop="fnStop" />
														</div>
														<div class="subject-pictures" v-else>
															<img :src = "replyItemPicShowItem2" alt = "图片九宫格" v-for="replyItemPicShowItem2 in replyItem.contentMediaUrlList" @click.stop="fnStop" />
														</div>
													</div>

												</div>
											</template>
										</div>
										<!--管理员操作-->
										<div class="comment-item-delete" title="特级-删除" @click="fnCommentItemDelete(replyListIndex)" v-if="pageData.circleTimelineAnchorStatus == 1" :data-deleteItemIndex="replyListIndex"></div>

									</div >

								</div>
								<!--圈子入口-->
								<div class="enter-summary before">
									<div class="enter-summary-h1">——    已显示全部回复    ——</div>
								</div>

							</div>
							<!-- 底部关注微信服务号入口-->
							<div class="fixed-followWx before"  @click.stop="fnChangeFollowWxDialogShow" v-show="pageData.subscribeStatus != 1">
								<div class="followWx-cblogo"></div>
								<div class="followWx-words"></div>
								<div class="followWx-rightIcon"></div>
							</div>
						</div>

						<!--输入-->
						<div class="main-ask" v-else>
							<div class="toolbar">
								<div id="cancel" @click="fnChangeContentShowStatus">取消</div>
								<div id="send" @click="fnSendComment"></div>
							</div>
							<textarea id="input" :placeholder="placeholderContent" ref="input"></textarea>

							<!--图片预览节点-->
							<div class = "img-item nodeDemo" data-id="1">
								<img src = "" class="uploadShowImg" />
								<div class="icon-delet"></div>
							</div >
							<form id="uploadForm" class="none">
								<input type="file" id="getContentMediaUrl"  @change="fnHandkeFileChange" ref="uploadFile" />
							</form>
							<div class="preview-box clear">
								<!--管理员权限-->
								<div class="box">
									<div class="add-pic left none" @click="fnAddPreViewPic">添加图片</div>
								</div>
								<!--已上传图片展示-->
								<div class="preview-box-imgList">
									<template v-for="(imgPreViewItem,imgPreViewIndex) in imgArr">
										<div class = "img-item" :data-id="imgPreViewIndex">
											<img :src = "imgPreViewItem" class="uploadShowImg" />
											<div class="icon-delet" :data-index="imgPreViewIndex" @click="fnDeletePreViewPic(imgPreViewIndex)"></div>
										</div >
									</template>
								</div>
							</div>
						</div>


						<!--解锁-->
						<div class="dialog-deblock" v-show="dialogDeblockShow" @click="fnDialogDeblockShow">
							<div class="deblock-icon" v-show="iconDeblockShow"></div>
							<div class="deblock-content" @click.stop="return false">
								<div class="deblock-type-share" @click="fnIconDeblockShow"></div>
								<div class="deblock-type-sendGift" @click="fnChangeDialogSendGiftShow"></div>
							</div>
						</div>

						<!--打赏-->
						<div class="dialog-sendGift" @click="fnChangeDialogSendGiftShow" v-show="dialogSendGiftShow && pageData.fromUserStatus">
							<div class="sendGift-content" @click.stop="return false">
								<div class="sendGift-close" @click="fnChangeDialogSendGiftShow"></div>
								<img :src = "pageData.userAvatar" alt = "打赏主播头像" class="sendGift-anchorAvatar" />
								<div class="sendGift-anchorNick">{{pageData.userNick}}</div>

								<div class="cash-list" v-if="pageData.rewardConfigs && pageData.rewardConfigs.length == 6">
									<div class="flex-col cash-list-row">
										<div class = "flex-col-item" @click="fnSendGift(pageData.rewardConfigs[0])">
											<div class="cash-list-item">
												<span class="cash-unit">￥</span><span>{{pageData.rewardConfigs[0].price | formatNum(0.1) }}</span>
											</div>
										</div >
										<div class = "flex-col-item" @click="fnSendGift(pageData.rewardConfigs[1])">
											<div class="cash-list-item">
												<span class="cash-unit">￥</span><span>{{pageData.rewardConfigs[1].price | formatNum(0.1) }}</span>
											</div>
										</div >
										<div class = "flex-col-item" @click="fnSendGift(pageData.rewardConfigs[2])">
											<div class="cash-list-item">
												<span class="cash-unit">￥</span><span>{{pageData.rewardConfigs[2].price | formatNum(0.1) }}</span>
											</div>
										</div >
									</div>
									<div class="flex-col cash-list-row">
										<div class = "flex-col-item" @click="fnSendGift(pageData.rewardConfigs[3])">
											<div class="cash-list-item">
												<span class="cash-unit">￥</span><span>{{pageData.rewardConfigs[3].price | formatNum(0.1) }}</span>
											</div>
										</div >
										<div class = "flex-col-item" >
											<div class="cash-list-item" @click="fnSendGift(pageData.rewardConfigs[4])">
												<span class="cash-unit">￥</span><span>{{pageData.rewardConfigs[4].price | formatNum(0.1) }}</span>
											</div>
										</div >
										<div class = "flex-col-item" >
											<div class="cash-list-item" @click="fnSendGift(pageData.rewardConfigs[5])">
												<span class="cash-unit">￥</span><span>{{pageData.rewardConfigs[5].price | formatNum(0.1) }}</span>
											</div>
										</div >
									</div>
								</div>
								<div class="sendGift-logo"></div>
							</div>
						</div>


						<!--单条主题操作-->
						<div class="dialog dialog-subjectToolDetail" v-show="subjectToolDetailShow" @click="fnChangeSubjectToolDetail">
							<!--圈主权限-->
							<div class="subjectToolDetail-content" @click.stop="return false" v-if="subjectToolDetailContentType == 3">
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
							<div class="subjectToolDetail-content" @click.stop="return false" v-else>
								<div class="subjectToolDetail-item font-red" @click="fnSubjectToolDetailDelete">删除</div>
								<div class="subjectToolDetail-item subjectToolDetail-item-cancel"  @click="fnChangeSubjectToolDetail">取消</div>
							</div>
						</div>

						<!--关注公众号-->
						<div class="dialog-followWx" @click="fnChangeFollowWxDialogShow" v-show="followWxDialogShow">
							<div class="followWx-content" @click.stop="return false">
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
						<!--菊花图-->
						<div id="wait" @click.stop="return false" class="loadingDialog none">
							<div class="icon-wait">{{loadingDescWord}}</div>
						</div>
						<!--评论删除-->
						<div class="dialog deleteOptionDialog" @click="fnChangeDeleteOptionDialogShow" v-show="deleteOptionDialogShow">
							<div class="followWx-content" @click.stop="return false">
								<div class="dialog-close" @click="fnChangeDeleteOptionDialogShow"></div>
								<!--描述-->
								<div class="followWx-desc">
									<label for = "input-deleteIndex" >待删序号:</label ><br />
									<input type = "text" id="input-deleteIndex" placeholder="请输入待删序号···" ref="deleteIndex" />
								</div>
								<div class="input-delete-checkInfo" @click="fnChangeDeleteCheckContent">检查</div>
								待删评论内容：
								<hr />
								<!--确认被删除的内容-->
								<div class="delete-checkContent" v-html="deleteCheckContent">
									deleteCheckContent
								</div>
								<hr />
								<div class="delete-confirm" @click="fnDoCommentItemDelete">删除</div>

							</div>
						</div>

					</div>
				
				
				
			</div>
		</div>
		</transition>
</template>

<script>
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue';
import PageNull from '@/components/PageNull/PageNull.vue';
let vmJson = {
    commentData: {},
    isCaibeiApp: false,
    loginUser: true,
    rewardConfigsSendData: {},
    rewardConfigsShow: {},
    rewardConfigsShowIndex: 0,
    subjectToolDetail: {}
};
export default {
    name: 'circleDetail',
    data: function() {
        return {
            pageData: null, //vmJson.dataJson,   //原始json
            contentShow: true, //输入框
            dialogSendGiftShow: false, //打赏弹窗
            followWxDialogShow: false, //关注服务号
            //loadingDialogShow: false,   //请求等待
            subjectToolDetailShow: false, //是否展示单条timeline操作详情面板
            subjectToolDetailContentType: 1, //单条timeline操作详情面板选项内容3：管理，1：自己
            subjectToolDetailContentZD: false, //单条timeline操作详情面板选项是否已置顶
            subjectToolDetailContentJH: 0, //单条timeline操作详情面板选项是否已精华
            rewardConfigsShow: {
                //                 index:vmJson.rewardConfigsShowIndex,
                //                 price:vmJson.dataJson.rewardConfigs&&vmJson.dataJson.rewardConfigs.length > 0?vmJson.dataJson.rewardConfigs[vmJson.rewardConfigsShowIndex].price:0,  //Number(Number(vmJson.dataJson.rewardConfigs[vmJson.rewardConfigsShowIndex].price / 10).toFixed(2)),
                //                 data:vmJson.dataJson.rewardConfigs?vmJson.dataJson.rewardConfigs[vmJson.rewardConfigsShowIndex]:{}
            }, //初始数据显示第一个
            placeholderContent: '请输入评论内容···',
            loadingDescWord: '正在发送···', //菊花图请求等待提示文字
            deleteOptionDialogShow: false, //打开评论删除操作弹窗
            deleteItemIndex: -1, //管理员删除评论-大模块的索引
            deleteItemChildIndex: -1, //管理员删除评论-大模块中子评论的索引
            deleteItemSubIndex: -1, //管理员删除评论-填写序号
            deleteCheckContent: '', //管理员删除评论-内容展示
            deleteCheckReplyId: -1, //管理员删除评论-replyId
            imgArr: [], //上传图片预览列表
            commentJson: [], //匿名0829版：评论列表
            dialogDeblockShow: false, //解锁弹窗
            iconDeblockShow: false //分享解锁提示图标
        };
    },
    components: {
        HeaderNav,
        PageNull
    },
    created: function() {
        this.$store.commit('updateStockCircleTid', this.$route.params.tid);
        this.fnInitData();
        //this.fnGetDomainM()
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
						that.fnLoadComment();
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        },
        fnGetDomainM: function() {
            var that = this;
            let url = `/DomainApi/stockCircle/getCircleDetail/${that.$store.state.stockCircleTid}`;
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
            		console.log('获取股票圈详情%s的数据:%O', that.$store.state.stockCircleTid, res.data);
            		let _d = res.data.data;
            		that.pageData = _d;
            		console.log(_d);
            		that.fnLoadComment();
            	})
            	.catch(function(err) {
            		console.log(err);
            	});
        },
		//实际评论
        fnGetDomainApiDetailData: function() {
            let url = `/DomainM/comment/list`;
            var that = this;
            that.axios
                .get(url, {
                    params: {
						size: 50,
						refId: that.$store.state.stockCircleTid,
						refType: 'circle',
                        desc: 'ineedstockonlinedetailcommentdata'
                    },
                    headers: {
                        token: that.$store.state.loginUserInfo.usename
                    }
                })
                .then(function(res) {
                    console.log('获取线上详情评论数据接口结果:%O', res.data);
                    if (res.data.status == 0) {
                        let _d = res.data;
                        that.commentJson = _d.data.replyListVos;
                        //that.$toast({ message: '跟新成功', duration: 500 });
                    } else {
                        that.$toast(res.data.msg);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        /*
             阻止冒泡
             * */
        fnStop: function() {
            console.log('阻止冒泡');
        },
        /*
            * 登录检查
            * */
        checkLogin: function() {
            if (!vmJson.loginUser) {
                if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
                    location.href =
                        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa430555f51edef4c&redirect_uri=' +
                        encodeURIComponent(
                            m_basic_domain +
                                'user/login/thirdParty?target=3&redirectUrl=' +
                                encodeURIComponent(location.href) +
                                ''
                        ) +
                        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                } else {
                    location.href =
                        'https://m.icaibei.net/user/login?redirectUrl=' +
                        encodeURIComponent(location.href);
                }
                return false;
            } else {
                return true;
            }
        },
        /*
            * 加载评论
            * */
        fnLoadComment: function() {
            /* var that = this;
            $.ajax({
                url: m_basic_domain + 'comment/list',
                data: {
                    size: 50,
                    refId: vmJson.dataJson.ctid,
                    refType: 'circle'
                },
                type: 'get',
                success: function(e) {
                    if (e.status != 0) {
                        alert(e.msg);
                    } else {
                        console.log(e);
                        that.commentJson = e.data.replyListVos;
                    }
                }
            }); */
			this.fnGetDomainApiDetailData()
        },
        /*
             点赞
             */
        fnChangeZanStatus: function(bool) {
            if (!this.checkLogin()) return false;
            var that = this;
            var type;
            if (bool == true) {
                type = 1;
                console.log('点赞【%s】', type);
            } else {
                type = -1;
                console.log('取消点赞【%s】', type);
            }
            /* $.ajax({
                url: m_basic_domain + 'praise/post',
                type: 'get',
                data: {
                    refType: 'circle',
                    refId: vmJson.dataJson.ctid,
                    num: type
                },
                success: function(e) {
                    if (e.status != 0) {
                        alert(e.msg);
                    } else {
                        console.log(e);
                        if (type == 1) {
                            that.pageData.praiseNicks.unshift(vmJson.loginUserNick);
                        } else {
                            that.pageData.praiseNicks[0] == vmJson.loginUserNick
                                ? that.pageData.praiseNicks.shift(vmJson.loginUserNick)
                                : console.log('不是最后一个，不找了');
                        }
                        that.pageData.praise = !that.pageData.praise;
                    }
                },
                err: function(e) {
                    alert(e.msg);
                }
            }); */
			let nick = that.$store.state.loginUserInfo.nick
			if (type == 1) {
				that.pageData.praiseNicks.unshift(nick);
			} else {
				that.pageData.praiseNicks[0] == nick
					? that.pageData.praiseNicks.shift(nick)
					: console.log('不是最后一个，不找了');
			}
			that.pageData.praise = !that.pageData.praise;
        },
        /*
             切换显示状态：内容/输入框
             */
        fnChangeContentShowStatus: function() {
            this.contentShow = !this.contentShow;
        },
        /*
             发送评论
             */
        fnSendComment: function() {
            var that = this;
            if (this.$refs.input.value != '') {
                vmJson.commentData.refType = 'circle';
                vmJson.commentData.refId = that.$store.state.stockCircleTid;//vmJson.dataJson.ctid;
                vmJson.commentData.contentText = vmJson.commentData.content = this.$refs.input.value;
                //上传图片内容
                if (that.imgArr.length > 0) {
                    vmJson.commentData.contentMediaUrl = JSON.stringify(that.imgArr);
                    vmJson.commentData.contentMediaType = 1;
                } else {
                    vmJson.commentData.contentMediaType = 0;
                }
                vmJson.commentData.isPush = 0;
                //console.table(vmJson.commentData);
                that.loadingDescWord = '正在发送···';
               /* $.ajax({
                    url: m_basic_domain + 'comment/post',
                    data: vmJson.commentData,
                    type: 'post',
                    success: function(e) {
                        if (e.status != 0) {
                            alert(e.msg);
                        } else {
                            console.log(e);
                            that.$refs.input.value = '';
                            //that.pageData = e.data.replyVos;
                            if (vmJson.commentData.index == -1) {
                                console.log('前面添加一个');
                                that.commentJson.unshift(e.data.replyListVo);
                            } else {
                                console.log('修改%s', vmJson.commentData.index);
                                that.commentJson[vmJson.commentData.index] = e.data.replyListVo;
                            }
                            //重置预览图
                            that.imgArr = [];
                            that.contentShow = true;
                            //location.reload(true);
                        }
                    },
                    err: function(e) {
                        alert(e.msg);
                    }
                }); */
				that.$refs.input.value = '';
				that.contentShow = !that.contentShow;
				
            } else {
                alert('内容不能为空');
            }
        },
        /*
             * 评论回复
             * */
        fnGoComment: function(
            toUserId,
            bindReplyId,
            toUserId2,
            toUserNick1,
            toUserNick2,
            index,
            toReplyId1,
            toReplyId2
        ) {
            if (!this.checkLogin()) return false;
            // 选取条目toUserId为自己时追评第二用户而不是评论自己
            //console.log("是否追评：%s",vmJson.loginUserId == toUserId);
            vmJson.commentData = {};
            vmJson.commentData.index = index; //记录评论的索引值
            vmJson.commentData.bindReplyId = bindReplyId;
            vmJson.commentData.toUserId = vmJson.loginUserId == toUserId ? toUserId2 : toUserId;
            vmJson.commentData.toReplyId = vmJson.loginUserId == toUserId ? toReplyId2 : toReplyId1;
            /*修改输入框提示内容*/
            if (bindReplyId == 0) {
                //回复详情
                this.placeholderContent = '请输入评论内容';
            } else {
                //回复评论
                if (vmJson.loginUserId == toUserId) {
                    this.placeholderContent = '回复 ' + toUserNick2;
                } else {
                    this.placeholderContent = '回复 ' + toUserNick1;
                }
            }
            this.contentShow = false;
        },
        /*
             * 打赏弹窗显示状态
             * */
        fnChangeDialogSendGiftShow: function() {
            if (!this.checkLogin()) return false;
            console.log('展示打赏弹窗');
            this.iconDeblockShow = false;
            this.dialogSendGiftShow = !this.dialogSendGiftShow;
        },
        /*
             * 跟换打赏金额
             * */
        fnChangeCashNum: function() {
            var that = this;
            var arr = that.pageData.rewardConfigs;
            if (arr.length > 0) {
                var newIndex = parseInt(arr.length * Math.random());
                if (newIndex == that.rewardConfigsShow.index) {
                    console.log(
                        '此次随机变化下标【%s】---当前展示下标【%s】,重试',
                        newIndex,
                        that.rewardConfigsShow.index
                    );
                    that.fnChangeCashNum();
                } else {
                    console.log(
                        '此次随机变化下标【%s】---当前展示下标【%s】',
                        newIndex,
                        that.rewardConfigsShow.index
                    );
                    vmJson.rewardConfigsShow = that.rewardConfigsShow = {
                        index: newIndex,
                        price: arr[newIndex].price, //Number(Number(arr[newIndex].price / 10).toFixed(2)),
                        data: arr[newIndex]
                    };

                    return;
                }
            } else {
                console.log('价格配置表为空，别点了');
            }
        },
        /*
             * 打赏
             * */
        fnSendGift: function(goodsItem) {
            var that = this;
            //that.rewardConfigsShow.data.rewardId = goodsItem.rewardId;

            var rewardVosAddItem = {
                //待加入打赏成员
                price: goodsItem.price,
                userAvatar: that.$store.state.loginUserInfo.avatar,//vmJson.loginUserAvatar,
                userNick: that.$store.state.loginUserInfo.nick//vmJson.loginUserNick
            };
            /* var payType = browser.versions.weixin ? 1 : 0;
            vmJson.rewardConfigsSendData = {
                category: 'reward',
                productId: goodsItem.rewardId,
                payType: payType,
                refId: '' + vmJson.dataJson.ctid,
                toUserId: '' + vmJson.dataJson.userId,
                openId: vmJson.loginUserInfo.openId,
                returnUrl:
                    'https://m.icaibei.net/stockCircle/getCircleDetail/' + vmJson.dataJson.ctid
            };
            console.log('打赏请求参数%O', vmJson.rewardConfigsSendData);

            that.loadingDescWord = '正在创建订单···';
            $.ajax({
                type: 'post',
                url: '/pay/createOrder',
                data: vmJson.rewardConfigsSendData,
                async: false,
                success: function(result) {
                    console.log(result);
                    if (result.status == 0) {
                        switch (payType) {
                            case 0:
                                // 支付宝
                                $('body').append(result.data.payParameters);
                                break;

                            case 1:
                                // 微信支付
                                function onBridgeReadyPay() {
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest',
                                        result.data.payParameters,
                                        function(res) {
                                            if (res.err_msg == 'get_brand_wcpay_request:ok') {
                                                if (that.pageData.unLockStatus == 0) {
                                                    //免费||有权限
                                                    that.pageData.rewardVos = that.pageData.rewardVos.concat(
                                                        rewardVosAddItem
                                                    );
                                                    that.dialogSendGiftShow = false;
                                                } else {
                                                    //打赏弹窗初始化
                                                    that.dialogSendGiftShow = false;
                                                    that.dialogDeblockShow = false;
                                                    that.iconDeblockShow = false;
                                                    location.href =
                                                        m_basic_domain +
                                                        'stockCircle/getCircleDetail/' +
                                                        vmJson.dataJson.ctid +
                                                        '?timeStamp=' +
                                                        Date.now();
                                                }
                                            }
                                        }
                                    );
                                }

                                if (typeof WeixinJSBridge == 'undefined') {
                                    //alert("jsbridge为undefined");
                                    if (document.addEventListener) {
                                        document.addEventListener(
                                            'WeixinJSBridgeReady',
                                            onBridgeReadyPay,
                                            false
                                        );
                                    } else if (document.attachEvent) {
                                        document.attachEvent(
                                            'WeixinJSBridgeReady',
                                            onBridgeReadyPay
                                        );
                                        document.attachEvent(
                                            'onWeixinJSBridgeReady',
                                            onBridgeReadyPay
                                        );
                                    }
                                } else {
                                    //alert("已经有jsbridge");
                                    onBridgeReadyPay();
                                }
                                break;
                        }
                    } else {
                        alert(result.msg);
                    }
                },
                error: function() {
                    alert('创建订单失败');
                }
            }); */
			that.pageData.rewardVos = that.pageData.rewardVos.concat(
				rewardVosAddItem
			)
			that.dialogSendGiftShow = false;
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
                '权限级别【%s】目录索引:【%s】ID:【%s】是否精华:【%s】是否置顶:【%s】内容发布者：【%s】',
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
             * 删除【区别timeline】
             * */
        fnSubjectToolDetailDelete: function() {
            var that = this;
            console.log('删除%s', vmJson.subjectToolDetail.ctid);
            /* that.loadingDescWord = '正在删除···';
            $.ajax({
                url:
                    m_basic_domain +
                    '/stockCircle/delCircleDetail/' +
                    vmJson.subjectToolDetail.ctid,
                type: 'get',
                success: function(e) {
                    if (e.status != 0) {
                        alert(e.msg);
                    } else {
                        console.log(e);
                        //that.pageData.circleTimelineVos = e.data.circleTimelineVos;
                        if (vmJson.subjectToolDetail.index == -1) {
                            //详情页
                            alert('删除成功，即将跳转回主页');
                            location.href =
                                m_basic_domain +
                                'stockCircle/' +
                                vmJson.dataJson.circleId +
                                '/timeline/list';
                        } else if (vmJson.subjectToolDetail.index >= 0) {
                            //timeline页
                            that.pageData.circleTimelineVos.splice(
                                vmJson.subjectToolDetail.index,
                                1
                            );
                        }
                    }
                },
                err: function(e) {
                    alert(e.msg);
                }
            }); */
			that.$router.replace("/stockCircle/timelineList/"+that.$store.state.stockCircleCid);
            //隐藏操作面板
            that.subjectToolDetailShow = false;
        },
        /*
             * 置顶:1/0
             * */
        fnUpdateTop: function(type) {
            var that = this;
            console.log('置顶%s【%s】', vmJson.subjectToolDetail.ctid, type);
            /* that.loadingDescWord = '正在发送···';
            $.ajax({
                url:
                    m_basic_domain +
                    'stockCircle/timeline/updateTop/' +
                    vmJson.subjectToolDetail.ctid,
                type: 'get',
                data: {
                    ctidTop: type
                },
                success: function(e) {
                    if (e.status != 0) {
                        alert(e.msg);
                    } else {
                        console.log(e);
                        if (vmJson.subjectToolDetail.index == -1) {
                            //详情页
                            if (type == 1) {
                                that.pageData = e.data.data.circleTimelineVos[0];
                            } else {
                                that.pageData.stickTop = !that.pageData.stickTop;
                            }
                        } else if (vmJson.subjectToolDetail.index >= 0) {
                            //timeline页
                            that.pageData.circleTimelineVos = e.data.data.circleTimelineVos;
                        }
                    }
                },
                err: function(e) {
                    alert(e.msg);
                }
            }); */
			that.pageData.stickTop = type == 1?true:false;
            //隐藏操作面板
            that.subjectToolDetailShow = false;
        },
        /*
             * 精华：1/0
             * */
        fnUpdateTimelineGoodStatus: function(type) {
            var that = this;
            /* that.loadingDescWord = '正在发送···';
            $.ajax({
                url:
                    m_basic_domain +
                    'stockCircle/timeline/updateGoodStatus/' +
                    vmJson.subjectToolDetail.ctid,
                type: 'get',
                data: {
                    timelineGoodStatus: type
                },
                success: function(e) {
                    if (e.status != 0) {
                        alert(e.msg);
                    } else {
                        console.log(e.data);
                        if (vmJson.subjectToolDetail.index == -1) {
                            //详情页
                            that.pageData.timelineGoodStatus = e.data.timelineGoodStatus;
                        } else if (vmJson.subjectToolDetail.index >= 0) {
                            //timeline页
                            that.pageData.circleTimelineVos[
                                vmJson.subjectToolDetail.index
                            ].timelineGoodStatus = e.data.timelineGoodStatus;
                        }
                    }
                },
                err: function(e) {
                    alert(e.msg);
                }
            }); */			
			that.pageData.timelineGoodStatus = type;
			
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
                var _circleId = that.pageData.circleId;
                $.ajax({
                    type: 'get',
                    url:
                        m_basic_domain +
                        'stockCircle/' +
                        _circleId +
                        '/' +
                        vmJson.subjectToolDetail.subjectToolDetailForbidUserId,
                    success: function(e) {
                        console.log(e);
                        if (e.status == 0) {
                            location.href =
                                m_basic_domain + '/stockCircle/' + _circleId + '/timeline/list';
                        }
                    },
                    error: function(err) {
                        alert(err.msg);
                    }
                });

                //隐藏操作面板
                that.subjectToolDetailShow = false;
            } else {
                //alert("取消");
            }
        },
        /*
             * 关注服务号
             * */
        fnChangeFollowWxDialogShow: function() {
            this.followWxDialogShow = !this.followWxDialogShow;
        },
        /*
             * 切换显示状态：单块评论删除弹窗
             * */
        fnChangeDeleteOptionDialogShow: function() {
            this.deleteOptionDialogShow = !this.deleteOptionDialogShow;
        },
        /*
             * 单块评论右侧管理员删除操作栏
             * */
        fnCommentItemDelete: function(e) {
            console.log('删除评论块：【%s】', e);
            this.deleteItemIndex = e;
            this.deleteOptionDialogShow = true;
        },
        /*
             * 切换被删除序号的展示待确认内容
             * */
        fnChangeDeleteCheckContent: function() {
            var that = this;
            var itemIndex = that.deleteItemIndex;
            var index = (that.deleteItemChildIndex = that.$refs.deleteIndex.value);
            if (index != '') {
                if (index == 0) {
                    var deleteItem = that.commentJson[itemIndex].replyMasterVo;
                } else if (index > 0 && index <= that.commentJson[itemIndex].replyChildVos.length) {
                    var deleteItem = that.commentJson[itemIndex].replyChildVos[index - 1];
                } else {
                    alert(
                        '请填写个待删除评论的序号0-' +
                            that.commentJson[itemIndex].replyChildVos.length
                    );
                }
                that.deleteCheckContent = deleteItem.content;
                that.deleteCheckReplyId = deleteItem.replyId;
                console.log(
                    'replyId:【%s】--content【%s】--deleteItem【%O】',
                    that.deleteCheckReplyId,
                    that.deleteCheckContent,
                    deleteItem
                );
                that.$refs.deleteIndex.value = '';
            } else {
                alert(
                    '请填写个待删除评论的序号0-' + that.commentJson[itemIndex].replyChildVos.length
                );
            }
        },
        /*
             * 删除请求
             * */
        fnDoCommentItemDelete: function() {
            var that = this;
            var r = confirm('确认删除以上评论内容！');
            if (r == true) {
                var href = m_basic_domain + 'comment/delete';
                that.loadingDescWord = '正在删除···';
                var pIndex = that.deleteItemIndex;
                var cIndex = that.deleteItemChildIndex;
                if (cIndex >= 0 && pIndex >= 0) {
                    $.ajax({
                        url: href,
                        data: {
                            replyId: that.deleteCheckReplyId,
                            refType: 'circle'
                        },
                        type: 'get',
                        success: function(e) {
                            if (e.status != 0) {
                                alert(e.msg);
                            } else {
                                console.log(e);
                                if (e.data.data.replyMasterVo != null) {
                                    that.commentJson[pIndex] = e.data.data;
                                } else {
                                    that.commentJson.splice(pIndex, 1);
                                }
                                /*if(cIndex == 0){
                                        that.commentJson.splice(pIndex,1);
                                    }else if(cIndex > 0){
                                        var length = that.commentJson[pIndex].replyChildVos.length;
                                        that.commentJson[pIndex].replyChildVos.splice(cIndex-1,1);
                                    }*/
                                that.deleteCheckContent = '';
                                that.deleteCheckReplyId = -1;
                                that.deleteOptionDialogShow = false;
                                that.deleteItemIndex = -1;
                                that.deleteItemChildIndex = -1;
                            }
                        },
                        err: function(e) {
                            alert(e.msg);
                        }
                    });
                } else {
                    alert('请先检查并确认删除内容是否一致');
                }
            }
        },
        /*
             * 添加图片上传
             * */
        fnAddPreViewPic: function() {
            var that = this;
            if (that.imgArr.length >= 9) {
                alert('最多添加9张图片');
            } else {
                $('#getContentMediaUrl').click();
            }
        },
        /*
             * 上传图片
             * */
        fnHandkeFileChange: function() {
            var that = this;
             /*var formData = new FormData($('#uploadForm')[0]);
            formData.append('file', $('#getContentMediaUrl')[0].files[0]);
            console.log(formData.get('file'));
            that.loadingDescWord = '正在上传···';
            $.ajax({
                type: 'post',
                data: formData,
                url: m_basic_domain + 'stockCircle/timeline/upload',
                contentType: 'multipart/form-data',
                contentType: false,
                processData: false,
                async: true,
                beforeSend: function() {
                    console.log('正在进行，即将上传 ，请稍候');
                },
                success: function(e) {
                    console.log(e);
                    if (e.data.length > 0) {
                        //console.log("图片上传完毕已获取最新地址%s",e.data[0].url);
                        that.imgArr.push(e.data[0].url);
                        that.$refs.uploadFile.value = '';
                    }
                },
                error: function(err) {
                    alert(err.msg);
                }
            }); */
			that.imgArr.push(that.$refs.uploadFile.value);
			that.$refs.uploadFile.value = '';
        },
        /*
             * 删除预览图
             * */
        fnDeletePreViewPic: function(e) {
            this.imgArr.splice(e, 1);
        },
        /*
            * 解锁
            * */
        fnDialogDeblockShow: function() {
            if (!this.checkLogin()) return false;
            this.iconDeblockShow = false;
            this.dialogDeblockShow = !this.dialogDeblockShow;
        },
        /*
             * 解锁-分享图标提示
             * */
        fnIconDeblockShow: function() {
            this.iconDeblockShow = true;
        }
    },
    filters: {
        formatNum: function(value, scale) {
            //console.log("[%s]--[%s]",value,scale);
            if (!value) return '0';
            value = Number(Number(value * scale).toFixed(3));
            return value;
        }
    }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/stockCircle-common.less';

.content {
    background-color: #efefef;
	min-height: calc(100% - 40px);
}
.detail-tools {
    height: 40px;
    margin: 16px 0 14px;
    padding-left: 20px;
    overflow: hidden;
    position: relative;
    font-size: 0;
}
.detail-tools-zan,
.detail-tools-zanEnd {
    display: inline-block;
    width: 86px;
    height: 100%;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_dianzan3.png);
}
.detail-tools-zanEnd {
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_dianzan3_a.png);
}
.detail-tools-sendGift {
    display: inline-block;
    width: 92px;
    height: 100%;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_dashang.png);
    margin-left: 15px;
}
/*对当前详情评论*/
.detail-comment {
    margin-left: 20px;
    background-color: #fafafa;
    width: 335px;
    box-sizing: border-box;
    padding: 0 10px 10px;
    font-size:13px;
    margin-bottom: 10px;
}
.comment-enterShow {
    height: 24px;
    line-height: 24px;
    background-color: #ffffff;
    padding-left: 10px;
    font-size: 12px;
    color: #cccccc;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
}
/*打赏列表*/
.subject-sendGiftList {
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 7px;
    width: 335px;
    box-sizing: border-box;
    overflow: hidden;
}
.subject-sendGiftList-item {
    padding: 6px 0 8px 12px;
    line-height: 24px;
    font-size: 13px;
    margin-bottom: 8px;
    background-color: #fafafa;
}
.subject-sendGiftList-item span {
    vertical-align: middle;
    word-break: break-all;
    word-wrap: break-word;
}
.sendGiftList-item-avatar {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
/*评论*/
.subject-comment {
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
    margin-bottom: 49px;
    margin-bottom: 0;
}
.comment-count {
    font-size: 14px;
    color: #999999;
    line-height: 14px;
    margin-top: 15px;
    padding-left: 20px;
}
.comment-item {
    width: 100%;
    position: relative;
    min-height: 50px;
    padding-bottom: 15px;
}
.comment-item:first-of-type:before {
    display: none;
}
.comment-avatar {
    left: 0;
}
.comment-header {
    padding-left: 46px;
}
.comment-topic {
    font-size: 17px;
    line-height: 24px;
    color: #333333;
}
/*输入*/
.main-ask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
	z-index: 2;
}
.toolbar {
    height: 50px;
    width: 100%;
    position: relative;
    background: #efefef;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.11);
}
#input {
    width: 375px;
    height: 200px;
    padding: 13px 15px 0;
    display: block;
    overflow: auto;
    outline: none;
    border: none;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 4px;
    padding: 15px 10px;
    font-size: 15px;
    color: #333333;
    resize: none;
}
#cancel {
    height: 50px;
    line-height: 50px;
    width: 62px;
    text-align: center;
    font-size: 16px;
    text-align: center;
}
#send {
    width: 64px;
    height: 34px;
    background: #fe6d18;
    border-radius: 3px;
    font-size: 16px;
    text-align: center;
    line-height: 34px;
    color: #ffffff;
    position: absolute;
    right: 15px;
    top: 8px;
    font-weight: bold;
    background-image: url(//static.cdn.icaibei.net/static/m/images/app/messageDiagnostic/wg_fasong.png);
}
/*打赏*/
.dialog-sendGift {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
}
.sendGift-content {
    width: 271px;
    height: 291px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -145.5px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    text-align: center;
}
.sendGift-close {
    width: 28px;
    height: 28px;
    position: absolute;
    right: 8px;
    top: 8px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_guanbimianban.png);
}
.sendGift-anchorAvatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    margin: 31px auto 10px;
    overflow: hidden;
}
.sendGift-anchorNick {
    line-height: 14px;
    font-size: 14px;
    color: #000000;
    margin-bottom: 20px;
    text-align: center;
}
.sendGift-cashNum {
    line-height: 20px;
    font-size: 20px;
    color: #000000;
    text-align: center;
}
.sendGift-changeCashNum {
    height: 52px;
    line-height: 52px;
    font-size: 14px;
    color: #5882b2;
}
.sendGift-btn {
    width: 172px;
    height: 40px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_dashang2.png);
    margin: 2px auto 2px;
}
.sendGift-logo {
    width: 185px;
    height: 16px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_weixinzhifu.png);
    margin: 0 auto;
}
/*圈子入口*/
.enter-summary {
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
    padding-bottom: 70px;
}
.summary-card {
    display: block;
    box-sizing: border-box;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    width: 345px;
    height: 140px;
    margin: 15px;
    background-color: #fafafa;
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
    font-size: 15px;
    height: 16px;
    line-height: 16px;
    margin-bottom: 7px;
    width: 240px;
    overflow-x: hidden;
    font-weight: bold;
    overflow: hidden;
}
.enter-desc {
    color: #666666;
    font-size: 13px;
    line-height: 20px;
    width: 235px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.enter-subDesc {
    color: #ffffff;
    background-color: #fe6d18;
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    width: 240px;
    overflow: hidden;
    margin-top: 5px;
    width: 100px;
    padding: 0 10px;
    border: 1px solid #fe6d18;
    text-align: center;
    border-radius: 16px;
}
.enter-summary-h1,
.enter-summary-follow {
    font-size: 14px;
    color: #999999;
    text-align: center;
    line-height: 16px;
}
.enter-summary-h1 {
    margin-top: 30px;
}
.font-blue {
    color: #5678a1;
}
.bottomLogo-follow {
    width: 226px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_weixiansaoma.png);
}
/*删除弹窗*/
.comment-item-delete {
    position: absolute;
    right: 0;
    top: 15px;
    width: 16px;
    height: 16px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_gengduo.png);
}
#input-deleteIndex {
    display: inline-block;
    width: 150px;
    height: 16px;
    line-height: 16px;
    padding: 0 5px;
    font-size: 11px;
    border: 1px solid #fe6d18;
    border-radius: 4px;
    outline: none;
}
.input-delete-checkInfo,
.delete-confirm {
    margin: 5px auto;
    width: 100px;
    height: 25px;
    line-height: 25px;
    border-radius: 20px;
    background-color: #fe6d18;
    color: #ffffff;
}
.delete-checkContent {
    width: 240px;
    height: 90px;
    margin: 0 auto;
    font-size: 14px;
    color: #333333;
    line-height: 24px;
    text-align: left;
    overflow: hidden;
}
/*顶部导航返回timeline*/
.header-nav {
    background-color: #fafafa;
    overflow: hidden;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 46px;
    line-height: 46px;
    text-align: center;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
}
.icon-back {
    display: block;
    width: 60px;
    height: 24px;
    line-height: 24px;
    position: absolute;
    top: 11px;
    left: 10px;
    padding-left: 22px;
    color: #999999;
    text-align: left;
    font-size: 15px;
    font-weight: normal;
}
.icon-back-icon {
    display: block;
    width: 24px;
    height: 24px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/activity/vip/discount/zf_houtui.png);
    position: absolute;
    top: 0;
    left: 0;
}
/*上传添加图片*/
.nodeDemo {
    display: none !important;
}
.preview-box {
    position: relative;
    font-size: 0;
}
.add-pic {
    width: 56px;
    height: 56px;
    line-height: 50px;
    color: #5784af;
    font-weight: bold;
    /*background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_charutupian.png);*/
    font-size: 16px;
    width: 75px;

    margin-left: 15px;
}
.preview-box-imgList {
    padding-left: 15px;
    box-sizing: border-box;
}
.box {
    width: 100%;
    height: auto;
    position: relative;
}
.preview-box .img-item {
    width: 105px;
    height: 105px;
    display: inline-block;
    margin-right: 7px;
    margin-bottom: 7px;
    background-color: #fafafa;
    position: relative;
}
.icon-delet {
    width: 28px;
    height: 28px;
    position: absolute;
    z-index: 1;
    right: 4px;
    top: 4px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/xcx_shanchutupian.png);
}
.comment-bg {
    background-color: #fafafa;
    margin-top: 12px;
    padding: 0 5px 5px;
    overflow: hidden;
}
/*打赏价格形式换列表*/
.cash-list {
    height: 140px;
    width: 95%;
    margin: 0 auto;
}
.cash-list .flex-col-item:after {
    display: none;
}
.cash-list-row {
    height: 50px;
    position: relative;
    overflow: hidden;
    margin-bottom: 4px;
}
.cash-list-row .flex-col-item {
    position: relative;
    overflow: hidden;
}
.cash-list-item {
    height: 40px;
    line-height: 40px;
    width: 80%;
    margin: 5px auto;
    border: 1px solid #fe6d18;
    border-radius: 4px;
    text-align: center;
    font-size: 20px;
    color: #fe6d18;
}
.cash-unit {
    font-size: 12px;
}
.header-nav{
	display: none;
}
.detail-deblock {
    width: 375px;
    height: 102px;
    padding-top: 24px;
    box-sizing: border-box;
}
.btn-deblock {
    width: 170px;
    height: 42px;
    margin: 0 auto;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/Group7@2x.png);
}
/*解锁*/
.dialog-deblock {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
}
.deblock-content {
    width: 375px;
    height: 212px;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/Group6@2x.png);
    overflow: hidden;
}
.deblock-icon {
    position: absolute;
    top: 40px;
    right: 40px;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/jt.png);
    width: 150.5px;
    height: 195px;
}
.deblock-type-share {
    box-sizing: border-box;
    margin-left: 50%;
    height: 112px;
}
.deblock-type-sendGift {
    box-sizing: border-box;
    margin-left: 50%;
    height: 100px;
}
.subject-content-box {
    position: relative;
    overflow: hidden;
}
.block-cover {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 152px;
    width: 100%;
    background-image: url(//static.cdn.icaibei.net/static/m/images/wx/stockZone/Rectangle2@2x.png);
}
</style>
