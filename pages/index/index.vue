<template>
	<view>
		<button @tap="toMatch">匹配模式</button>
		<button @tap="toRoute">路由模式</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				res: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			toMatch() {
				uni.navigateTo({
					url: '/pages/match/match'
				})
			},
			toRoute() {
				uni.navigateTo({
					url: '/pages/route/route'
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
</style>
