"use strict";

const explain = require("explain-unicloud");

module.exports = class test extends explain.service {

	async checkToken() {
		return {
			checked: true,
			data: this.context.user
		}
	}

	async exception() {
		throw new Error("test.exception异常了");
	}

}
