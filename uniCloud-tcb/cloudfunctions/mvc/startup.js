"use strict";

module.exports = (app) => {

	// 初始化
	app.init({
		baseDir: __dirname, // 项目根目录
		serviceDir: "/controllers/", // controllers目录
		enableMatchMode: false // 启用匹配模式，false为禁用，禁用后仅支持路由模式访问业务函数
	});

	// 设置根路由，设置后云函数URL化不用输入路由可到达指定方法
	app.route.add([{
		route: "/",
		service: "home",
		routes: [{
			action: "index",
			httpMethod: ["GET"]
		}]
	}]);

	// 添加单个路由
	app.route.add([{
		// 云函数URL化后访问：https://云函数域名/请求路径/index.html
		route: "index.html",
		service: "home",
		routes: [{
			action: "index",
			httpMethod: ["GET"]
		}]
	}, {
		// 云函数URL化后访问：https://云函数域名/请求路径/about.html
		route: "about.html",
		service: "about",
		routes: [{
			action: "index",
			httpMethod: ["GET"]
		}]
	}]);

	// 使用中间件示例
	app.use(async ({
		event: _event,
		context: _context,
		explain: _explain,
		next
	}) => {
		// 异常处理中间件
		try {
			console.log("m1-0")
			await next();
			console.log("m1-1")
		} catch (e) {
			// 将响应信息改为异常信息
			_explain.response.body = {
				message: e.message + (_explain.request.service === "test" && _explain.request
					.action === "exception" ? "，经过了异常处理中间件" : "")
			}
		}
	});

}
