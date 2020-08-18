<template>
	<div id="container">
		<div style="background-color: #fff;">
			<iframe src="index.vue" :height="window_height" :width="window_width" frameborder="0" scrolling="0"></iframe>
		</div>
		<input v-model="inputnumber" @input="changenumber" maxlength="5" style="position: absolute;bottom: 10px;right: 10px;border: 1px solid #000;" placeholder="请随便输入8位以上数字">
	</div>
</template>

<script>
	export default {
		data(){
			return{
				window_width:'',
				window_height:'',
				hahaha:true,
				inputnumber:'',
			}
		},
		onReady() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
			        // console.log(res.windowWidth);
					that.window_width = res.windowWidth/3
					that.window_height = res.windowHeight
			    }
			});
			console.log('\n      ___           ___           ___           ___     \n     /\\  \\         /\\  \\         /\\  \\         /\\__\\    \n    /::\\  \\       /::\\  \\       /::\\  \\       /:/  /    \n   /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/__/     \n  /:/  \\:\\  \\   /::\\~\\:\\  \\   /::\\~\\:\\  \\   /::\\__\\____ \n /:/__/_\\:\\__\\ /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/\\:::::\\__ \ \n \:\\  /\\ \\/__/  \\:\\~\\:\\ \\/__/ \\:\\~\\:\\ \\/__/ \\/_|:|~~|~   \n  \\:\\ \\:\\__\\    \\:\\ \\:\\__\\    \\:\\ \\:\\__\\      |:|  |    \n   \\:\\/:/  /     \\:\\ \\/__/     \\:\\ \\/__/      |:|  |    \n    \\::/  /       \\:\\__\\        \\:\\__\\        |:|  |    \n     \\/__/         \\/__/         \\/__/         \\|__|    \n')
			console.log('恭喜你发现隐藏的彩蛋')
			console.log('胜利就在不远的前方啦')
			console.log('不要告诉其他小伙伴呦~进群再和其他小伙伴分享吧！')
			console.log('加群有验证有问题请联系QQ:365475241')
			console.log('如果你成功的通过面试，可以凭这句话向网技的常委要一杯奶茶哟（常委不给主编帮你打他）(*╹▽╹*)')
		},
		methods:{
			changenumber(){
				if(this.inputnumber.length >=8){
					alert('网络技术部门迎新群号：1139909567')
				}
			}
		}
	}
</script>

<style>
	#container{
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url(../../static/bg.png);
		background-repeat: repeat;
	}
</style>
