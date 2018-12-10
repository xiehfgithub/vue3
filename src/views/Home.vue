<template>
	<div class="home">
		<HeaderNav :name="$route.name"></HeaderNav>
		<mt-swipe @change="handleChange" :auto="2000" :speed="1000" :defaultIndex="0" :stopPropagation="true">
			<mt-swipe-item>
				<img alt="Vue logo" src="../assets/xhf.png">11192
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" src="../assets/x.png">2
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" src="../assets/h.png">3
			</mt-swipe-item>
			<mt-swipe-item>
				<img alt="Vue logo" src="~@/assets/f.png">4
			</mt-swipe-item>
		</mt-swipe>

		<div class="desc">{{$store.state.domain}}__{{axiosData}}</div>

		<mt-button type="default">default</mt-button>
		<mt-button type="primary">primary</mt-button>
		<mt-button type="danger">danger</mt-button>
		<HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
	</div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data: function () {
    return {
      axiosData: 0
    }
  },
  components: {
    HeaderNav,
    HelloWorld
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
      that.axiosData = JSON.stringify(res.data)
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
	@import '../assets/common.less';
	.mint-swipe {
		height: 100px;
		line-height: 100px;
		text-align: center;
	}

	.mint-swipe-item {
		background-color: #ccc;
	}

	.desc {
		font-size: 37.5px;
		color: @color;
	}
</style>
