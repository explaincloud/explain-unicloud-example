let interceptor = {
	request: (options, extend) => {
		if (options.url.indexOf('//') === -1) {
			options.url = (extend.baseUrl ||
				'https://7fcb278c-f2cc-4339-8802-f9c49cf5886e.bspapp.com/http/app') + '/' + options.url
		}
		options.header = {
			'Token': '123456'
		}
		return options
	}
}

module.exports = interceptor
