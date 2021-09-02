<template>
	<view>
		<view class="res">
			<wg-json-view v-if="res" ref="jsonView" :fontSize="12" :collapsable="true" :obj="res"></wg-json-view>
		</view>
		<view class="tips">请求记录过滤器请到云函数日志查看记录内容</view>
		<button @tap="getValues">GET api/values</button>
		<button @tap="getValue">GET api/values/{id}</button>
		<button @tap="postValue">POST api/values</button>
		<button @tap="putValue">PUT api/values/{id}</button>
		<button @tap="deleteValue">DELETE api/values/{id}</button>
		<button @tap="checkValueIsExists">GET api/values/exists/{id}</button>
		<button @tap="getValuesByTypeAndColumn">GET api/values/{type}/{column}</button>
		<button @tap="getValueByYearAndMonthAndDay">GET api/values/{year}/{month}/{day}</button>
		<button @tap="rpmp">GET api/values/{year}-{month}-{day}</button>
		<button @tap="mix"
			class="ellipsis">GETapi/values/date-{year}-{month}-{day}/time:{hour}:{minute}:{second}</button>
		<button @tap="postRoot">POST root</button>
	</view>
</template>

<script>
	const uniCloudUrl = 'https://7fcb278c-f2cc-4339-8802-f9c49cf5886e.bspapp.com/http/app'

	export default {
		data() {
			return {
				res: null
			}
		},
		methods: {
			getValues() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values', 'get', {
						extend: {
							// 通过拦截器可以设置baseUrl
							baseUrl: uniCloudUrl
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			getValue() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values/5', 'get')
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			postValue() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values', 'post', {
						data: {
							name: 'Sansnn',
							like: ['explain-unicloud', 'explain-admin']
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			putValue() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values/5', 'put', {
						data: {
							name: 'Sansnn',
							like: ['explain1', 'explain2', 'explain3']
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			deleteValue() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values/5', 'delete')
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			checkValueIsExists() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values/exists/5', 'get')
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			getValuesByTypeAndColumn() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values/new/10', 'get')
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			getValueByYearAndMonthAndDay() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values/2020/02/28', 'get')
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			rpmp() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values/2020-02-28', 'get')
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			mix() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request('api/values/date-2020-02-28/time:19:30:00', 'get')
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			postRoot() {
				uni.showLoading({
					mask: true
				})
				this.res = null
				this.$creq
					.request(uniCloudUrl, 'post', {
						data: {
							name: 'Sansnn',
							like: ['explain1', 'explain2']
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
					.finally(() => {
						uni.hideLoading()
					})
			}
		}
	}
</script>

<style>
	.res {
		width: 100%;
		min-height: 20vh;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #ededed;
	}

	.tips {
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 12px;
		color: #888888;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
