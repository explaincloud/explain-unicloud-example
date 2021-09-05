"use strict";

const explain = require("explain-unicloud");
explain.mvc = require("explain-unicloud-mvc");

module.exports = class home extends explain.mvc.controller {

	index() {
		return this.view();
	}
	
	redirect() {
		// 重定向到index
		return this.redirect('/http/pages/index.html');
	}

}
