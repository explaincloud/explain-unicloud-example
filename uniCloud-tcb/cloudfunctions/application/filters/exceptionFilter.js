// 需要继承抽象父类explain.filter

const explain = require("explain-unicloud");

module.exports = class exceptionFilter extends explain.filter {

	async onException() {
		let {
			explain: _explain
		} = this;

		// 输出日志
		console.error("------------");
		console.error("发生错误");
		if (_explain.request.service) {
			console.error(`service: ${_explain.request.service}`);
		}
		if (_explain.request.action) {
			console.error(`action: ${_explain.request.action}`);
		}
		if (_explain.request.route) {
			console.error(`route: ${_explain.request.route}`);
		}
		if (_explain.request.httpMethod) {
			console.error(`httpMethod: ${_explain.request.httpMethod}`);
		}
		if (_explain.request.routeTemplate) {
			console.error(`routeTemplate: ${_explain.request.routeTemplate}`);
		}
		if (_explain.request.data) {
			console.error(`data: ${JSON.stringify(_explain.request.data)}`);
		}
		console.error(`异常信息: ${_explain.exception.message}`);
		console.error("原始异常: ", _explain.exception);
		console.error("------------");

		// 发送异常信息到电子邮件
		// 
		
		throw new Error(_explain.exception.message + "，经过了异常处理过滤器");
	}

}
