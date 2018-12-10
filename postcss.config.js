module.exports = {
  'plugins': {
    'autoprefixer': {},
    'postcss-plugin-px2rem': {
    	'rootValue': 50,	// 设计稿十分之一
      'propList': ['*']
    }
  }
}
