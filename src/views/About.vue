<template>
	<div class="about">
		<HeaderBar title="关于"></HeaderBar>
		<h3>{{axiosData.data}}</h3>

	</div>
</template>

<script type="text/javascript">
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'

export default {
  name: 'home',
  data: function () {
    return {
      axiosData: 0
    }
  },
  components: {
    HeaderBar
  },
  created: function () {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~About.vue~~~~~~~~~~~~~~~~~~~~~~~~~~')
    let url = '/DomainM/article/data/1041312'
    var that = this
    this.axios.get(url, {
      params: {

      },
      headers: {
        token: 'hf-token1'
      }
    }).then(function (res) {
      console.log('axios get模式请求【同$.get】:%O', res.data)
      that.axiosData = res.data
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
	h3{
		color: @color;
	}
</style>
