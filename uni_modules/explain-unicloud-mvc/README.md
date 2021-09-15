# EXPLAIN-UNICLOUD-MVC

框架交流QQ群：[970799055](https://jq.qq.com/?_wv=1027&k=KFkDL5gp)。

示例地址：[https://tcb-e386czuna1dv2wib7e6bd-d064f3.service.tcloudbase.com/http/pages](https://tcb-e386czuna1dv2wib7e6bd-d064f3.service.tcloudbase.com/http/pages)

## 使用方式
业务类继承 `explain.mvc.controller`，可以继承两个方法
```javascript
const explain = require("explain-unicloud");
explain.mvc = require("explain-unicloud-mvc");

const userModel = require("../models/user");

module.exports = class home extends explain.mvc.controller {

	index() {
		return this.view();
	}
	
	redirect() {
		// 重定向到index
		return this.redirect('/http/pages/index.html');
	}
	
	user() {
		let user = new userModel();
		user.name = "Sansnn";
		return this.view(user);
	}

}
```

控制器

## 页面渲染
使用 `JavaScript` 模板引擎进行页面渲染，内部采用 [lodash template](https://lodash.com/docs/4.17.15#template) 进行实现。

## lodash template语法
待完成...