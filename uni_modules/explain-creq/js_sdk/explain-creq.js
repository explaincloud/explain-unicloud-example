//---------------------------------------------------------------------
// github        https://github.com/explaincloud/explain-creq
// organization  Explain Cloud
// author        Sansnn
// license       MIT
//---------------------------------------------------------------------

function callFunction(options, extend) {
	// options => name, service, action, data
	// extend => ...custom.properties

	// 检查请求拦截
	if (creq.interceptor.callFunction.request &&
		typeof creq.interceptor.callFunction.request === 'function') {
		options = creq.interceptor.callFunction.request(options, extend)
	}

	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: options.name,
			data: {
				service: options.service,
				action: options.action,
				data: options.data
			}
		}).then(res => {
			// 检查响应拦截
			let resInterceptor = null
			if (creq.interceptor.callFunction.response &&
				typeof creq.interceptor.callFunction.response === 'function') {
				// response内return false表示失败会进入reject
				resInterceptor = creq.interceptor.callFunction.response(res, options, extend)
			}
			if (resInterceptor === null || resInterceptor === undefined) {
				res.data = res.result
				delete res.result
				resolve(res)
			} else if (resInterceptor === false) {
				res.data = res.result
				delete res.result
				reject(res)
			} else {
				resInterceptor.data = resInterceptor.result
				delete resInterceptor.result
				resolve(resInterceptor)
			}
		}).catch(err => {
			let errInterceptor = null
			if (creq.interceptor.callFunction.error &&
				typeof creq.interceptor.callFunction.error === 'function') {
				errInterceptor = creq.interceptor.callFunction.error(err, options, extend)
			}
			reject(errInterceptor || err)
		})
	})
}

function request(options, extend) {
	// options => url, method, params, headers, timeout, dataType, responseType
	// extend => ...custom.properties

	// 检查请求拦截
	if (creq.interceptor.request.request &&
		typeof creq.interceptor.request.request === 'function') {
		options = creq.interceptor.request.request(options, extend)
	}

	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success: res => {
				// 检查响应拦截
				let resInterceptor = null
				if (creq.interceptor.request.response &&
					typeof creq.interceptor.request.response === 'function') {
					// response内return false表示失败会进入reject
					resInterceptor = creq.interceptor.request.response(res, options, extend)
				}
				if (resInterceptor === null || resInterceptor === undefined) {
					resolve(res)
				} else if (resInterceptor === false) {
					reject(res)
				} else {
					resolve(resInterceptor)
				}
			},
			fail: err => {
				let errInterceptor = null
				if (creq.interceptor.request.error &&
					typeof creq.interceptor.request.error === 'function') {
					errInterceptor = creq.interceptor.request.error(err, options, extend)
				}
				reject(errInterceptor || err)
			}
		})
	})
}

let creq = {
	callFunction: (service, action, options = {}) => {
		// options => data, name, ...extend
		let data = options.data || {}
		let name = options.name
		let extend = options
		delete extend.data
		delete extend.name
		return callFunction({
			service,
			action,
			data,
			name
		}, extend)
	},
	request: (url, method, options = {}) => {
		// options => data, config, ...extend
		let data = options.data || {}
		let config = options.config || {}
		let extend = options
		delete extend.data
		delete extend.config
		return request({
			url,
			method,
			data,
			...config
		}, extend)
	},
	interceptor: {
		callFunction: {
			request: null,
			response: null,
			error: null
		},
		request: {
			request: null,
			response: null,
			error: null
		}
	}
}

export default creq
