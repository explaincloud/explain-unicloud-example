"use strict";

module.exports = {
	validator: {
		"type": "object",
		"title": "test.validator",
		"description": "test.validator校验integer",
		"properties": {
			"id": {
				"display": "编号",
				"type": "integer",
				"requiredErrorMessage": "{display}不能为空",
				"minimum": 1,
				"minimumErrorMessage": "{display}最小为{minimum}"
			}
		},
		"required": ["id"]
	}
}
