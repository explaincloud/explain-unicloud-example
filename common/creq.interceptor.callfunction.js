let interceptor = {
	request: (options, extend) => {
		options.name = options.name || 'application' // 设置默认请求的云函数名称
		return options
	}
}

module.exports = interceptor
