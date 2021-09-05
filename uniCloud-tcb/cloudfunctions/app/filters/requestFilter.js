// 需要继承抽象父类explain.filter

const explain = require("explain-unicloud");
explain.validator = require("explain-validator"); // 数据校验器
const fs = require("fs");
const path = require("path");

module.exports = class requestFilter extends explain.filter {

	async onActionExecuting() {
		let {
			explain: _explain
		} = this;

		// 校验请求参数
		let schemaPath = path.join(_explain.config.baseDir, `schemas/${_explain.request.service}.js`);
		let schemaExists = await new Promise((resolve) => {
			fs.exists(schemaPath, exists => resolve(exists));
		});
		if (schemaExists) {
			let serviceSchema = require(schemaPath);
			let actionSchema = serviceSchema[_explain.request.action];
			if (actionSchema) {
				let validate = explain.validator.data({
					data: _explain.request.data,
					schema: actionSchema
				});
				if (validate.result.valid) {
					// 将请求参数类型转换为JSON Schema对应类型
					_explain.request.data = validate.data;
				} else {
					throw new Error(validate.errors[0]);
				}
			}
		}

		console.log("------------");
		console.log("请求开始");
		if (_explain.request.service) {
			console.log(`service: ${_explain.request.service}`);
		}
		if (_explain.request.action) {
			console.log(`action: ${_explain.request.action}`);
		}
		if (_explain.request.route) {
			console.log(`route: ${_explain.request.route}`);
		}
		if (_explain.request.routeTemplate) {
			console.log(`routeTemplate: ${_explain.request.routeTemplate}`);
		}
		if (_explain.request.httpMethod) {
			console.log(`httpMethod: ${_explain.request.httpMethod}`);
		}
		if (_explain.request.data) {
			console.log(`data: ${JSON.stringify(_explain.request.data)}`);
		}
		console.log("------------");

		console.log(_explain)
	}

	async onActionExecuted() {
		let {
			explain: _explain
		} = this;

		console.log(_explain)

		console.log("------------");
		console.log("请求结束");
		console.log(`response: ${JSON.stringify(_explain.response.body)}`);
		console.log("------------");

		// 可对explain.response.body重新赋值来改变响应结果
		if (_explain.mode === "route") {
			_explain.response.body = {
				response: _explain.response.body,
				service: _explain.request.service,
				action: _explain.request.action,
				data: _explain.request.data,
				route: _explain.request.route,
				routeTemplate: _explain.request.routeTemplate,
				httpMethod: _explain.request.httpMethod
			}
		} else {
			_explain.response.body = {
				response: _explain.response.body,
				service: _explain.request.service,
				action: _explain.request.action,
				data: _explain.request.data
			}
		}
	}

}
