let interceptor = {
	request: (options, extend) => {
		if (typeof extend.showLoading === 'object') {
			uni.showLoading(extend.showLoading)
		}
		if (options.url.indexOf('//') === -1) {
			options.url = (extend.baseUrl ||
					'https://tcb-e386czuna1dv2wib7e6bd-d064f3.service.tcloudbase.com/http/app') +
				'/' + options.url
		}
		options.header = {
			'Token': '123456'
		}
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
