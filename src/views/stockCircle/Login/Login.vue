<template>
	<div class="page main" id="login">
	<div class="banner"></div>
	<!-- 密码登录-->
	<div class="loginByPassword" v-if="loginByPassword">
		<div class="ipt-box tel-box">
			<label  class="ipt-icon icon-tel" for="input-tel" ></label >
			<input type = "text" placeholder="手机号" class="input" id="input-tel" ref="tel" v-model="tel" />
		</div>
		<div class="ipt-box password-box">
			<label class="ipt-icon icon-password" for="input-password" ></label>
			<input type = "password" placeholder="密码" class="input" id="input-password" ref="password" v-model="password" />
		</div>

		<div class="login" @click="fnPasswordLogin"></div>
		<div class="change-yzm" @click="fnChangeLoginWay">验证码快捷登录</div>
	</div>
	<!-- 验证码登录-->
	<div class="loginByYzm" v-else>
		<div class="ipt-box tel-box">
			<label  class="ipt-icon icon-tel" for="input-tel1" ></label >
			<input type = "text" placeholder="手机号" class="input" id="input-tel1" ref="tel" v-model="tel"  />
			<!-- 发送验证码-->
			<div class="yzm-box yzm-box-send" v-if="unCountDown && effectiveTel" @click="fnGetCode">获取验证码</div>
			<div class="yzm-box yzm-box-ready" v-else-if="unCountDown">获取验证码</div>
			<div class="yzm-box" v-else >{{CountDownNumber}}s</div>
		</div>
		<div class="ipt-box password-box">
			<label class="ipt-icon icon-yzm" for="input-yzm" ></label>
			<input type = "text" placeholder="验证码" class="input" id="input-yzm" ref="yzm" v-model="yzm" />
		</div>
		<div class="login btn-yzm-login" @click="fnYzmLogin"></div>
		<div class="change-password" @click="fnChangeLoginWay">切换密码登录</div>
	</div>
	<!-- 第三方登录-->
	<div class="otherWay"></div>
	<div class="login-thirdWay">
		<a class = "thirdWay thirdWay-qq" :href="LoginByQQHref" ></a >
		<a class = "thirdWay thirdWay-wx" :href="LoginByWXHref" ></a >
		<a class = "thirdWay thirdWay-wb" :href="LoginByWBHref" ></a >
	</div>
</div>
</template>

<script>
var m_basic_domain = "https://m.icaibei.net/";
var _qq =
    'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101438982&redirect_uri=' +
    encodeURIComponent(
        'https://www.icaibei.net/user/login/thirdParty?target=2&redirectUrl=$!{redirectUrl}'
    );

var _wx =
    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa430555f51edef4c&redirect_uri=' +
    encodeURIComponent(
        m_basic_domain + 'user/login/thirdParty?target=3&redirectUrl=$!{redirectUrl}'
    ) +
    '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

var _wb =
    'https://api.weibo.com/oauth2/authorize?client_id=3923961560&response_type=code&redirect_uri=' +
    encodeURIComponent(
        m_basic_domain + 'user/login/thirdParty?target=4&redirectUrl=$!{redirectUrl}'
    );
var vmJson = {
	redirectUrl: "",
	loginByQQ:	_qq,
	loginByWX:	_wx,
	loginByWB:	_wb,
}

export default {
    name: 'login',
    data: function() {
        return {
            tel: '',
            yzm: '',
            password: '',
            loginByPassword: true, //默认密码登陆
            redirectUrl: vmJson.redirectUrl,
            LoginByQQHref: vmJson.loginByQQ,
            LoginByWXHref: vmJson.loginByWX,
            LoginByWBHref: vmJson.loginByWB,
            CountDownNumber: 60, //倒计时数字
            unCountDown: true, //倒计时 可发送状态
            effectiveTel: false //有效的手机格式
        };
    },
    components: {},
    created: function() {
		this.redirectUrl = vmJson.redirectUrl = this.$route.query.redirect;
		//再检测一次登录状态 登录则直接跳转目的页
		this.$store.commit('checkLogin');
		if(this.$store.state.isLogin){
			this.$router.replace(this.redirectUrl);
		}
	},
    methods: {
        fnChangeLoginWay: function() {
            //切换登录--验证码|密码
            this.password = this.yzm = '';
            this.loginByPassword = !this.loginByPassword;
        },
        fnPasswordLogin: function() {
            //密码登录
            /* console.log(this.$refs.tel.value);
            console.log('手机号%s---密码%s---验证码%s', this.tel, this.password, this.yzm);
            //ajax
            var _url = m_basic_domain + 'user/login/mobile';
            var _data = {
                mobile: this.tel,
                redirectUrl: vmJson.redirectUrl,
                password: $.md5(this.password + '-caibei-' + this.password)
            };
            $.ajax({
                type: 'post',
                url: _url,
                data: _data,
                success: function(msg) {
                    if (msg.reason == '') {
                        location.href = decodeURIComponent(vmJson.redirectUrl);
                    } else {
                        alert(msg.reason);
                    }
                }
            });
            console.log(_data); */
			
			//lstk || 18701481351 登录成功
			if(!( (/^1(3|4|5|7|8)\d{9}$/.test(this.tel)) || this.tel == "lstk")){
				this.$toast({
					message: '账号不对',
					position: 'middle',
					duration: 500
				})
			}else{
				var that = this;
				let fn = function(){
					that.$router.push(that.$route.query.redirect);
				}
				fn.prototype.usename = that.tel;console.log(fn)
				this.$store.dispatch("login",fn);
			}		
		
        },
        fnGetCode: function() {
            this.unCountDown = false;
            var that = this;
            console.log('手机号%s---验证码%s', this.tel, this.yzm);
            //ajax
            $.ajax({
                type: 'get',
                url: m_basic_domain + 'user/login/loginVerifyCode',
                data: {
                    mobile: this.tel
                },
                success: function(e) {
                    console.log('获取验证码返回结果：%O', e);
                    if (e.status == 0) {
                        var _time = setInterval(function() {
                            that.CountDownNumber--;
                            if (that.CountDownNumber == 0) {
                                clearInterval(_time);
                                console.log('时间到了，重置');
                                that.CountDownNumber = 60;
                                that.unCountDown = true;
                            }
                        }, 1000);
                    } else {
                        alert(e.msg);
                    }
                },
                error: function(err) {
                    alert(err.msg);
                }
            });
        },
        fnYzmLogin: function() {
            var that = this;
            console.log('手机号%s---验证码%s', this.tel, this.yzm);
            if (this.tel != '' && this.yzm != '') {
                $.ajax({
                    type: 'post',
                    url: m_basic_domain + 'user/login/loginMobileCode',
                    data: {
                        mobile: this.tel,
                        code: this.yzm
                    },
                    success: function(e) {
                        console.log('登录返回结果：%O', e);
                        if (e.status == 0) {
                            location.href = decodeURIComponent(vmJson.redirectUrl);
                        } else {
                            alert(e.msg);
                        }
                    },
                    error: function(err) {
                        alert(err.msg);
                    }
                });
            }
        }
    },
    watch: {
        tel: function(val, oldval) {
            console.log('tel变化前值： %s --现在值： %s ', oldval, val);
            if (val.length == 11) {
                this.effectiveTel = true;
            } else {
                this.effectiveTel = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.ipt-box:after {
    content: '';
    width: 200%;
    height: 1px;
    background: #e6e6e6;
    position: absolute;
    bottom: 0;
    left: 0;
    -webkit-transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform: scale(0.5);
    transform-origin: 0 0;
}
.banner {
    width: 100%;
    height: 200px;
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_bg.jpg);
    overflow: hidden;
    margin-bottom: 18px;
}
.ipt-box {
    width: 260px;
    height: 50px;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
}
.ipt-icon {
    position: absolute;
    bottom: 14px;
    bottom: 16px;
    left: 0;
    width: 18px;
    height: 18px;
    cursor: pointer;
    z-index: 1;
}
.icon-tel {
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_sjh.png);
}
.icon-password {
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_mm.png);
}
.icon-yzm {
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_yzm.png);
}
.input {
    display: inline-block;
    height: 48px;
    line-height: 48px;
    width: 100%;
    overflow: hidden;
    color: #333333;
    font-size: 14px;
    position: relative;
    border: none;
    outline: none;
    box-sizing: border-box;
    padding-left: 33px;
}
input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #b3b3b3 !important;
}
　　:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #b3b3b3 !important;
}
　　::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #b3b3b3 !important;
}
　　input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #b3b3b3 !important;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    background: #ffffff !important;
    background-image: none !important;
    color: #333333 !important;
}
.login {
    width: 268px;
    height: 48px;
    margin: 12px auto;
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_dl.png);
}
.change-yzm,
.change-password {
    color: #fe6d18;
    line-height: 18px;
    height: 18px;
    width: 100%;
    margin-bottom: 50px;
    text-align: center;
}
.otherWay {
    width: 261px;
    height: 14px;
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_qita.png);
    margin: 0 auto 22px;
}
.login-thirdWay {
    width: 100%;
    height: 70px;
    position: relative;
    margin: 0;
    overflow: hidden;
}
.thirdWay {
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    width: 54px;
    height: 70px;
}
.thirdWay-qq {
    left: 62px;
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_qq.png);
}
.thirdWay-wx {
    left: 0;
    right: 0;
    margin: 0 auto;
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_weixin.png);
}
.thirdWay-wb {
    right: 62px;
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_weibo.png);
}
.yzm-box {
    width: 92px;
    height: 27px;
    line-height: 23px;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    border-radius: 37px;
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: 10px;
    color: #cccccc;
    font-size: 13px;
    text-align: center;
}
.yzm-box-send {
    color: #ffffff;
    background: #fe6d18;
}
.btn-yzm-login {
    background-image: url(https://static.cdn.icaibei.net/static/m/images/login/2018/dl_dl_yzm.png);
}
</style>
