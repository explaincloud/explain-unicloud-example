"use strict";

module.exports = (app) => {

	// 初始化
	app.init({
		baseDir: __dirname, // 项目根目录
		serviceDir: "/services/", // service目录
		serviceKey: "service", // 匹配模式下service参数别名，默认"service"，作用是与其他参数冲突时可以修改为别的名称
		actionKey: "action", // 匹配模式下action参数别名，默认"action"，作用是与其他参数冲突时可以修改为别的名称
		dataKey: "data", // 匹配模式下data参数别名，默认"data"，作用是与其他参数冲突时可以修改为别的名称
		enableMatchMode: true, // 启用匹配模式，false为禁用，禁用后仅支持路由模式访问业务函数
		matchIgnore: [ // 匹配模式忽略指定的service和actions，忽略后仅配置路由模式后可访问
			{
				service: "home",
				actions: ["index"]
			}
		]
	});

	// 设置根路由，设置后云函数URL化不用输入路由可到达指定方法
	app.route.add([{
		route: "/",
		service: "home",
		routes: [{
			action: "index",
			httpMethod: ["GET"]
		}]
	}, {
		route: "/",
		service: "values",
		routes: [{
			action: "postValueAsync",
			httpMethod: ["POST"]
		}, {
			action: "putValueAsync",
			httpMethod: ["PUT"]
		}, {
			action: "deleteValueAsync",
			httpMethod: ["DELETE"]
		}]
	}]);

	// 添加单个路由
	app.route.add({
		// 云函数URL化后访问：https://云函数域名/请求路径/index.html
		route: "index.html",
		service: "home",
		routes: [{
			action: "index",
			httpMethod: ["GET"]
		}]
	});

	// 批量添加路由
	app.route.add([{
		route: "api/values", // 可省略，省略后路由模板为service，也就是"values"
		service: "values",
		routes: [
			// GET api/values 获取列表数据
			{
				// route: "", // 路由模板与service一致则可省略
				// httpMethod: "GET", // action名称以对应RESTful动词开头则可省略
				action: "getValuesAsync"
			},
			// GET api/values/5 获取id为5的数据，{id}会自动解析为参数注入event.data中
			{
				route: "{id}",
				// httpMethod: "GET", // action名称以对应RESTful开头则可省略
				action: "getValueAsync"
			},
			// POST api/values 新增一条数据
			{
				// route: "", // 路由模板与service一致则可省略
				// httpMethod: "POST", // action名称以对应RESTful开头则可省略，除此之外还支持以create、add、insert开头
				action: "postValueAsync"
			},
			// PUT api/values/5 更新id为5的数据，{id}会自动解析为参数注入event.data中
			{
				route: "{id}",
				// httpMethod: "PUT", // action名称以对应RESTful开头则可省略，除此之外还支持以update开头
				action: "putValueAsync"
			},
			// DELETE api/values/5 删除id为5的数据，{id}会自动解析为参数注入event.data中
			{
				route: "{id}",
				// httpMethod: "DELETE", // action名称以对应RESTful开头则可省略，除此之外还支持以remove开头
				action: "deleteValueAsync",
			},
			// GET api/values/exists/5 获取id为5的数据是否存在，{id}会自动解析为参数注入event.data中
			{
				route: "exists/{id}",
				httpMethod: "GET",
				action: "checkValueIsExistsAsync"
			},
			// GET api/values/new/10 获取type为new，column为10的数据，{type}、{column}会自动解析为参数注入event.data中
			{
				route: "{type}/{column}",
				httpMethod: "GET",
				action: "getValuesAsync"
			},
			// GET api/values/2020/02/28 获取year为2020，month为02，day为28的数据，{year}、{month}、{day}会自动解析为参数注入event.data中
			{
				route: "{year}/{month}/{day}",
				httpMethod: "GET",
				action: "getValueByYearAndMonthAndDayAsync"
			},
			// GET api/values/2020-02-28 获取year为2020，month为02，day为28的数据，{year}、{month}、{day}会自动解析为参数注入event.data中
			{
				route: "{year}-{month}-{day}",
				httpMethod: ["GET"],
				action: "getValueByYearAndMonthAndDayAsync"
			},
			// GET api/values/date-2020-02-28/time:19:30:00 获取year为2020，month为02，day为28，hour为19，minute为30，second为00的数据，{year}、{month}、{day}、{hour}、{minute}、{second}会自动解析为参数注入event.data中
			{
				route: "date-{year}-{month}-{day}/time:{hour}:{minute}:{second}",
				httpMethod: ["GET"],
				action: "getValueByYearAndMonthAndDayAsync"
			}
		]
	}, {
		route: "api/test",
		service: "test",
		routes: [{
			route: "checktoken",
			httpMethod: ["GET", "POST"],
			action: "checkToken"
		}, {
			route: "testevent",
			httpMethod: ["GET", "POST"],
			action: "testEvent"
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

	app.use(async ({
		next
	}) => {
		console.log("m2-0")
		await next();
		console.log("m2-1")
	});

	app.use(async ({
		next
	}) => {
		console.log("m3-0")
		await next();
		console.log("m3-1")
	});

	// 使用过滤器示例
	app.filter.add([{
		filter: require("./filters/requestFilter"), // 添加请求记录过滤器
		ignore: [{
			service: "home",
			actions: ["index"]
		}]
	}, {
		filter: require("./filters/exceptionFilter") // 添加异常处理过滤器
	}, {
		filter: require("./filters/tokenFilter"), // 添加身份验证过滤器
		ignore: [{
			service: "values"
		}, {
			service: "home"
		}, {
			service: "test",
			actions: ["exception", "validator"]
		}]
	}]);

	// 中间件是在匹配到服务和方法之前，过滤器在匹配到服务和方法还有路由之后

}
