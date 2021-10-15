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
	
	async validator({
		id
	}) {
		return {
			id
		}
	}
	
	async testEvent() {
		console.log('event', this.event)
		console.log('explain.request', this.explain.request)
	}
	
	async testGetRouteData({
		code
	}) {
		return {
			code
		}
	}

}
