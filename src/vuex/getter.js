export default {
  hello: (state) => { return '经getter.hello转化后的数据:' + state.hello },
  anchor: (state, getters) => {
  	// getters 当前顶级对象包含所有getters 方法
  	// console.log('来自getter.js:  ---%O---', getters)
  	return state.anchor + '【getter过滤后】'
  }
}
