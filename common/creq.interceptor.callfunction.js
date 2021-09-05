let interceptor = {
	request: (options, extend) => {
		if (typeof extend.showLoading === 'object') {
			uni.showLoading(extend.showLoading)
		}
		options.name = options.name || 'app' // 设置默认请求的云函数名称
		return options
	},
	response: (res, options, extend) => {
		if (extend.showLoading && (extend.hideLoading === true || typeof extend.hideLoading === 'undefined')) {
			uni.hideLoading() // 响应成功后立马关闭loading
		} else if (extend.hideLoading === false) {
			// 手动关闭loading
		}
	}
}

module.exports = interceptor
