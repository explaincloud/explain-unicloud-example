<template>
	<view>
		<view class="res">
			<wg-json-view v-if="res" ref="jsonView" :fontSize="12" :collapsable="true" :obj="res"></wg-json-view>
		</view>
		<view class="tips">请求记录过滤器请到云函数日志查看记录内容</view>
		<button @tap="callValuesGetValues">values.getValuesAsync</button>
		<button @tap="callValuesGetValue">values.getValueAsync</button>
		<button @tap="callValuesPostValue">values.postValueAsync</button>
		<button @tap="callHomeIndex">home.index 忽略匹配测试</button>
		<button @tap="callTestCheckTokenSuccess">身份验证成功测试（过滤器）</button>
		<button @tap="callTestCheckTokenFail">身份验证失败测试（过滤器）</button>
		<button @tap="callTestException">异常处理测试（中间件+过滤器）</button>
		<button @tap="callTestValidator">数据校验处理测试</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				res: null
			}
		},
		methods: {
			callValuesGetValues() {
				this.res = null
				this.$creq
					.callFunction('values', 'getValuesAsync', {
						name: 'app', // 可指定云函数名称
						showLoading: {
							mask: true
						},
						hideLoading: false // 手动关闭loading
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
			callValuesGetValue() {
				this.res = null
				this.$creq
					.callFunction('values', 'getValueAsync', {
						data: {
							id: 5
						},
						showLoading: {
							mask: true
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
			},
			callValuesPostValue() {
				this.res = null
				this.$creq
					.callFunction('values', 'postValueAsync', {
						data: {
							name: 'Sansnn',
							like: ['E', 'X', 'P', 'L', 'A', 'I', 'N']
						},
						showLoading: {
							mask: true
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
			},
			callHomeIndex() {
				this.res = null
				this.$creq
					.callFunction('home', 'index', {
						showLoading: {
							mask: true
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
			},
			callTestCheckTokenSuccess() {
				this.res = null
				this.$creq
					.callFunction('test', 'checkToken', {
						data: {
							token: 'Sansnn'
						},
						showLoading: {
							mask: true
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
			},
			callTestCheckTokenFail() {
				this.res = null
				this.$creq
					.callFunction('test', 'checkToken', {
						data: {
							token: '3snn'
						},
						showLoading: {
							mask: true
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
			},
			callTestException() {
				this.res = null
				this.$creq
					.callFunction('test', 'exception', {
						showLoading: {
							mask: true
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
			},
			callTestValidator() {
				this.res = null
				this.$creq
					.callFunction('test', 'validator', {
						data: {
							// id: 0
							// id: '100'
						},
						showLoading: {
							mask: true
						}
					})
					.then(res => {
						this.res = res.data
					})
					.catch(err => {
						this.res = err.message
					})
			}
		}
	}
</script>

<style>
	.res {
		width: 100%;
		min-height: 20vh;
		padding: 16px;
		box-sizing: border-box;
		background-color: #ededed;
	}

	.tips {
		padding: 16px;
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
