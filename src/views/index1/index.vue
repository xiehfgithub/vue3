<template>
	<div class="home">
		<HeaderNav></HeaderNav>
		<mt-swipe @change="handleChange" :auto="2000" :speed="1000" :defaultIndex="0" :stopPropagation="true">
			<mt-swipe-item>
				<img alt="Vue logo" src="~@/assets/xhf.png">11192
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" src="~@/assets/x.png">2
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" src="~@/assets/h.png">3
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" src="~@/assets/f.png">4
			</mt-swipe-item>
		</mt-swipe>

		<div class="desc line3">{{$store.state.domain}}__{{pageData}}</div>

		<mt-button type="default">default</mt-button>
		<mt-button type="primary">primary</mt-button>
		<mt-button type="danger">danger</mt-button>

		<!--懒加载-->
		<div class="goods-list">
			<img src="~@/assets/loading-spin.svg" />
			<img v-lazy="'https://img.cdn.icaibei.net/avatar/072d9042fc465c11fabe1e67cec1d1d0.jpg!app_user_avatar210'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/c4b5200af099104ac935e23947f610d8.jpeg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/6490880cb53cd37cefa2b15d463db941.jpg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/4d4fd01f3616bd4aa9de300216e6d6d3.jpeg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/f2337d60d96c4864a7be803a13c76b55.jpeg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/4220437a86f9b9da5022e40652ec6d6c.jpeg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/93d4b0fa74e4a5aeaff26f9a4f696466.jpg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/avatar/072d9042fc465c11fabe1e67cec1d1d0.jpg!app_user_avatar210'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/c4b5200af099104ac935e23947f610d8.jpeg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/6490880cb53cd37cefa2b15d463db941.jpg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/4d4fd01f3616bd4aa9de300216e6d6d3.jpeg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/f2337d60d96c4864a7be803a13c76b55.jpeg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/4220437a86f9b9da5022e40652ec6d6c.jpeg'" />
			<img v-lazy="'https://img.cdn.icaibei.net/circleTimeline/93d4b0fa74e4a5aeaff26f9a4f696466.jpg'" />
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue'
export default {
  name: 'index1',
  data: function () {
    return {
      pageData: 0,
      img: 'https://img.cdn.icaibei.net/avatar/072d9042fc465c11fabe1e67cec1d1d0.jpg!app_user_avatar210'
    }
  },
  components: {
    HeaderNav
  },
  created: function () {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~Home.vue~~~~~~~~~~~~~~~~~~~~~~~~~~')
    let url = '/API/users'
    var that = this
    this.axios.get(url, {
      params: {
        size: 10,
        refId: 11192,
        refType: 'circle'
      },
      headers: {
        token: 'hf-token1'
      }
    }).then(function (res) {
      console.log('axios get模式请求【同$.get】:%O', res.data)
      that.pageData = JSON.stringify(res.data)
      that.$toast('请求成功')
    }).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    handleChange (index) {
      // console.log(index)
    }
  }
}
</script>

<style scoped lang="less">
	/*@import '../../assets/common.less';*/
	.mint-swipe {
		height: 100px;
		line-height: 100px;
		text-align: center;
	}

	.mint-swipe-item {
		background-color: #ccc;
	}

	.desc {
		font-size: 15px;
		color: @color;
	}

	.goods-list{
		background: @buttombg;
	}
	.line3{
		.textLine(4)
	}
</style>
