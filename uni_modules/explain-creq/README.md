# EXPLAIN-CREQ

框架交流QQ群：[970799055](https://jq.qq.com/?_wv=1027&k=KFkDL5gp)。

## 使用方式
### HTTP请求
#### request(url, method, options)
options基本参数

|参数|类型|说明|
|--	|--	|--	|
|data|Object|请求数据|
|config|Object|请求参数，对应`uni.request`参数，参数说明：[https://uniapp.dcloud.io/api/request/request?id=request](https://uniapp.dcloud.io/api/request/request?id=request)|
|...extend|Object|自定义任意参数|

```javascript
import creq from '@/uni_modules/explain-creq/js_sdk/explain-creq.js'

creq.request('http://www.example.com', 'post', {
	data: {
		id: 9,
		name: 'Sansnn'
	}
}).then(res => {
	console.log(res)
})
```
### explain-unicloud云函数请求
#### callFunction(service, action, options)
options基本参数

|参数|类型|说明|
|--	|--	|--	|
|data|Object|请求数据|
|name|String|云函数名称|
|...extend|Object|自定义任意参数|

```javascript
import creq from '@/uni_modules/explain-creq/js_sdk/explain-creq.js'

creq.callFunction('service', 'action', {
	name: 'cloudfunctionName',
	data: {
		id: 9,
		name: 'Sansnn'
	}
}).then(res => {
	console.log(res)
})
```

## 请求拦截和响应拦截
```javascript
import creq from '@/uni_modules/explain-creq/js_sdk/explain-creq.js'

// HTTP请求拦截器
creq.interceptor.request = {
	// 请求拦截
	request: (options, extend) => {
		return options // 必须返回options
	},
	// 响应拦截
	response: (res, options, extend) => {},
	// 错误处理
	error: (err, options, extend) => {}
}

// explain-unicloud云函数请求拦截器
creq.interceptor.callfunction = {
	// 请求拦截
	request: (options, extend) => {
		return options // 必须返回options
	},
	// 响应拦截
	response: (res, options, extend) => {},
	// 错误处理
	error: (err, options, extend) => {}
}
```

## 全局使用
```javascript
import Creq from './uni_modules/explain-creq/js_sdk/explain-creq.js'
Vue.prototype.$creq = Creq

// 拦截器
import CreqInterceptorRequest from './common/creq.interceptor.request.js'
Vue.prototype.$creq.interceptor.request = CreqInterceptorRequest
import CreqInterceptorCallFunction from './common/creq.interceptor.callfunction.js'
Vue.prototype.$creq.interceptor.callfunction = CreqInterceptorCallFunction
```
然后在页面通过`this.$creq`调用
```javascript
onLoad () {
	this.$creq.request('http://www.example.com?name=creq', 'get')
		.then(res => {
			console.log(res)
		})
}
```

## 高级使用
可在`options`中自定义参数，然后到拦截器中使用，以下是一个自定义全局请求loading的案例，在请求发送前显示loading效果，然后在响应成功后自动关闭loading  
1. 先在`common`目录创建拦截器，`/common/creq.interceptor.request.js`，并在`main.js`中引入，以`全局使用`中为例  
2. 书写拦截器

```javascript
let interceptor = {
	request: (options, extend) => {
		if (typeof extend.showLoading === 'object') {
			uni.showLoading(extend.showLoading)
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
```

3. 在页面中使用

```javascript
this.$creq
	.request('http://www.example.com', 'get', {
		showLoading: {
			mask: true
		}
	})
	.then(res => {
		this.res = res.data
	})
```

更多示例请下载示例项目查看