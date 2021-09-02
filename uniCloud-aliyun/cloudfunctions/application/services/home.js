"use strict";

const explain = require("explain-unicloud");
const fs = require("fs");

function render(html, data) {
	Object.keys(data).forEach(x => {
		html = html.replace(new RegExp(`{{${x}}}`, "g"), data[x]);
	});
	return html;
}

module.exports = class home extends explain.service {

	index() {
		// 读取html
		var html = fs.readFileSync(this.explain.config.baseDir + "/views/index.html").toString();
		
		// 一个简单的动态渲染html案例
		html = render(html, {
			title: "Hello,explain-unicloud!",
			name: "Sansnn"
		});
		
		this.explain.response.headers["content-type"] = "text/html";
		return html;
	}

}
