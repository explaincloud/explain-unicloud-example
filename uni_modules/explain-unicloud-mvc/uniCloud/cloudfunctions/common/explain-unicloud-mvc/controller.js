"use strict";

const explain = require('explain-unicloud');
const fs = require("fs");
const _ = require("lodash");

/**
 * 控制器抽象基类
 */
module.exports = class controller extends explain.service {
	constructor({
		event,
		context,
		explain
	}) {
		super({
			event,
			context,
			explain
		});

		this.view = (model) => {
			let html = fs.readFileSync(this.explain.config.baseDir +
				`/views/${this.explain.request.service}/${this.explain.request.action}.html`).toString();
			if (model) {
				let render = _.template(html);
				html = render(model);
			}
			this.explain.response.headers["content-type"] = "text/html";
			return html;
		}

		this.redirect = (url, statusCode = 302) => {
			this.explain.response.statusCode = statusCode;
			this.explain.response.headers["content-type"] = "text/html";
			this.explain.response.headers["location"] = url;
		}
	}

}
