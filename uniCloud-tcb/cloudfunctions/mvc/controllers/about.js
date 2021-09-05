"use strict";

const explain = require("explain-unicloud");
explain.mvc = require("explain-unicloud-mvc");

const userModel = require("../models/user");

module.exports = class about extends explain.mvc.controller {

	index() {
		let user = new userModel();
		user.name = "Sansnn";
		return this.view(user);
	}

}
