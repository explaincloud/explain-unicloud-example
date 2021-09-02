"use strict";

const explain = require("explain-unicloud");

module.exports = class values extends explain.service {

	async getValuesAsync() {
		return {
			data: ["explain-unicloud", "explain-admin"],
			message: "获取成功"
		}
	}

	async getValueAsync({
		id
	}) {
		return {
			data: {
				id,
				name: "Sansnn"
			},
			message: "获取成功"
		}
	}

	async postValueAsync({
		name,
		like
	}) {
		return {
			data: {
				id: 9,
				name,
				like
			},
			message: "添加成功"
		}
	}

	async putValueAsync({
		id,
		name,
		like
	}) {
		return {
			data: {
				id,
				name,
				like
			},
			message: "更新成功"
		}
	}

	async deleteValueAsync({
		id
	}) {
		return {
			data: {
				id
			},
			message: "删除成功"
		}
	}

	async checkValueIsExistsAsync({
		id
	}) {
		return {
			data: {
				id,
				checked: true
			},
			message: "检查成功"
		}
	}

	async getValueByYearAndMonthAndDayAsync({
		year,
		month,
		day
	}) {
		return {
			data: {
				date: `${year}-${month}-${day}`
			},
			message: "获取成功"
		}
	}

}
