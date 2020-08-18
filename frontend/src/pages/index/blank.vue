<template>
	<view></view>
</template>

<script>
	export default {
		data(){
			return{
				window_width:'',
			}
		},
		onReady() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
			        // console.log(res.windowWidth);
					that.window_width = res.windowWidth
			    }
			});
			if(this.window_width <970){
				uni.redirectTo({
					url:'./index'
				})
			}
			else if(this.window_width >= 970){
				uni.redirectTo({
					url:'./pc'
				})
			}
		},
	}
</script>

<style>
</style>
