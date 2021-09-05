"use strict";

const explain = require("explain-unicloud");
const startup = require("./startup");

exports.main = async (event, context) => explain.run({
	event,
	context,
	startup
});
