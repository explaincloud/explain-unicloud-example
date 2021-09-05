// 需要继承抽象父类explain.filter

"use strict";

const explain = require("explain-unicloud");

module.exports = class tokenFilter extends explain.filter {

	async onActionExecuting() {
		let {
			explain: _explain,
			context: _context
		} = this;

		if (!_explain.request.data.token) {
			// 使用_explain.response.body直接返回至客户端
			_explain.response.body = {
				code: 401,
				message: "缺少token"
			}
			return;
		}

		// let user = checkToken(_explain.request.data.token); // 自行封装的token验证方法
		let user = _explain.request.data.token == "Sansnn" ? {
			id: 1,
			name: "Sansnn"
		} : null;
		if (user) {
			_context.user = user;
		} else {
			_explain.response.body = {
				code: 401,
				message: "token无效"
			}
			return;
		}
	}

}
