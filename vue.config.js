const path = require('path')
module.exports = {
	baseUrl: '/vue/',
	outputDir: '../be/vuePublic/dist',
	assetsDir: undefined,
	runtimeCompiler: undefined,
	productionSourceMap: undefined,
	parallel: undefined,
	css: undefined,

	devServer: {
		// 设置主机地址
		host: 'localhost',
		// 设置默认端口
		port: 8080,
		// 设置代理
		proxy: {
			'/API': {
				target: 'http://localhost:3000',
				ws: true,
				changeOrigin: false,
				pathRewrite: {
					'^/API': '/API/'
				}
			},
			'/DomainM': {
				target: 'http://test.m.icaibei.net',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/DomainM': ''
				}
			},
			'/DomainApi': {
				target: 'http://test.api.icaibei.net',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/DomainApi': ''
				}
			}
			
		},
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: path.resolve(__dirname, 'src/assets/less/base.less') // 所有组件前面整体注入less
		}
	}
}
