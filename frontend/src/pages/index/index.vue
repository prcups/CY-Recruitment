<template>
	<view class="wrap">
		<view>
			<u-toast ref="uToast" />
		</view>

		<u-form :model="model" :rules="rules" ref="uForm" :errorType="['message']">
			<u-form-item :leftIconStyle="{ color: '#888', fontSize: '32rpx' }" left-icon="account" label-width="120" :label-position="'left'" label="姓名" prop="name">
				<u-input :border="false" placeholder="请输入姓名" v-model="model.name" type="text"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="性别" prop="sex" label-width="120" left-icon="woman">
				<u-input :border="false" type="select" :select-open="actionSheetShow" v-model="model.sex" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="出生日期" prop="date" label-width="170" left-icon="calendar">
				<u-input :border="false" type="select" :select-open="date_show" v-model="model.date" placeholder="请选择出生日期" @click="date_show = true"></u-input>
			</u-form-item>

			<u-form-item
				:rightIconStyle="{ color: '#888888', fontSize: '32rpx' }"
				right-icon="kefu-ermai"
				:label-position="'left'"
				label="手机号码"
				prop="phone"
				label-width="170"
				left-icon="kefu-ermai"
			>
				<u-input :border="false" placeholder="请输入手机号" v-model="model.phone" type="number"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="验证码" prop="code" label-width="150" left-icon="more-circle">
				<u-input :border="false" placeholder="请输入验证码" v-model="model.code" type="text"></u-input>
				<u-button slot="right" type="success" size="mini" :disabled="phoneNotRight" @click="getCode">{{ codeTips }}</u-button>
			</u-form-item>

			<u-form-item :label-position="'left'" label="QQ" prop="qq_number" label-width="150" left-icon="qq-fill">
				<u-input :border="false" placeholder="请输入qq号" v-model="model.qq_number" type="text"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="上传自己的照片" prop="photo" label-width="200" left-icon="photo">
				<u-upload width="200" @on-uploaded="onUploaded" name="photo" :action="imageUpload"></u-upload>
			</u-form-item>

			<u-form-item :label-position="'left'" label="所在学院和专业" prop="major" label-width="260" left-icon="home">
				<u-input :border="false" placeholder="请输入所在学院和专业" v-model="model.major" type="text"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="部门选择" label-width="180" prop="subject" left-icon="star">
				<u-checkbox-group max="2" @change="checkboxGroupChange" :width="'auto'" :wrap="false">
					<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">{{ item.name }}</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<view style="width: 90vw;height: 10vh;">简介需要填写的部门需求:
				<view v-for="(item, index) in checkboxList" :key="index" style="color: #007AFF;" v-if="item.checked">{{item.content}}</view>
			</view>
			<u-form-item :label-position="'left'" label="简介" prop="intro"  left-icon="list-dot">
				<u-input type="textarea" :border="false" placeholder="请填写简介(不超过2000字且包含该部门的需求)" v-model="model.intro" />
			</u-form-item>
			
			<u-picker mode="time" @confirm='confirmDate' v-model="date_show" :params="params" default-time='2002-01-01'></u-picker>
		</u-form>

		<u-button @click="submit">提交</u-button>

		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>

		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
export default {
	data() {
		return {
			container:'wrap',
			window_width:'',
			baseUrl: "http://localhost:8000/",
			phoneNotRight: true,
			model: {
				major:'',
				qq_number:'',
				name: '',
				sex: '',
				subject: '',
				intro: '',
				agreement: false,
				phone: '',
				code: '',
				photo: '',
				date:''
			},
			token: 'nil',
			codeTips: '',
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur']
					},
				],
				sex: [
					{
						required: true,
						message: '请选择性别',
						trigger: ['change', 'blur']
					}
				],
				intro: [
					{
						required: true,
						message: '请填写简介'
					},
					{
						min: 5,
						message: '简介不能少于5个字',
						trigger: ['change', 'blur']
					},
				],
				choose: [
					{
						required: true,
						message: '请选择您感兴趣的部门',
						trigger: 'change',
						type: 'array'
					}
				],
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur']
					},
					{
						validator: (rule, value, callback) => {
							this.phoneNotRight = !this.$u.test.mobile(value)
							return !this.phoneNotRight
						},
						message: '手机号码不正确',
						trigger: ['change', 'blur']
					}
				],
				code: [
					{
						required: true,
						message: '请输入验证码',
						trigger: ['change', 'blur']
					},
					{
						type: 'number',
						message: '验证码只能为数字',
						trigger: ['change', 'blur']
					}
				],
				major: [
					{
						required: true,
						message: '请输入专业',
						trigger: ['change', 'blur']
					}
				]
			},
			checkboxList: [
				{ name: '秘书处', checked: false, disabled: false ,content:'秘书处：这里是秘书处的具体需求'},
				{ name: '网技', checked: false, disabled: false, content:'网技:请用电脑填写表单并发现隐藏的彩蛋吧(*╹▽╹*)'},
				{ name: '摄影', checked: false, disabled: false, content:'摄影:这里是摄影的具体需求'},
				{ name: '播音', checked: false, disabled: false, content:'播音:这里是播音的具体需求'},
				{ name: '摄像', checked: false, disabled: false, content:'摄像:这里是摄像的具体需求'},
				{ name: '采编', checked: false, disabled: false, content:'采编:这里是采编的具体需求'},
				{ name: '设计', checked: false, disabled: false, content:'设计:这里是设计的具体需求'},
				{ name: '运营', checked: false, disabled: false, content:'运营:这里是运营的具体需求'}
			],
			actionSheetList: [
				{
					text: '男'
				},
				{
					text: '女'
				}
			],
			params: {
				year: true,
				month: true,
				day: true,
				hour: false,
				minute: false,
				second: false
			},
			date_show: false,
			actionSheetShow: false,
		};
	},
	computed: {
		imageUpload() {
			return this.baseUrl + "api/get-photo/"
		},
	},
	onReady() {
		var that = this
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		onUploaded(lists) {
			this.model.photo = lists[0].response
		},
		submit() {
			let _this = this;
			if (_this.model.name === ""
					|| _this.model.sex === ""
					|| _this.model.birthday === ""
					|| _this.model.phone_number === ""
					|| _this.model.qq_number === ""
					|| _this.model.photo === ""
					|| _this.model.major === ""
					|| _this.model.subject === ""
					|| _this.model.intro === ""
					|| _this.model.code === ""
			) {
				_this.$refs.uToast.show({
					title: '信息填写不完整',
					type: 'error'
				})
				return
			}
			uni.showModal({
				title:'确定您已经将各部门的要求内容填写到简介中了吗？',
				success(res) {
					if(res.confirm){
						uni.request({
							url: _this.baseUrl + 'api/get-post/',
							data: {
								name: _this.model.name,
								sex: _this.model.sex,
								birthday: _this.model.date,
								phone_number: _this.model.phone,
								qq_number: _this.model.qq_number,
								photo: _this.model.photo,
								major: _this.model.major,
								subject: _this.model.subject,
								token: _this.token,
								intro: _this.model.intro,
								code: _this.model.code
							},
							method: 'POST',
							success: res => {
								if (res.data == -1) {
									_this.$refs.uToast.show({
										title: '验证码错误',
										type: 'error'
									})
								} else if (res.data == -2) {
									_this.$refs.uToast.show({
										title: '似乎已经提交过了...',
										type: 'error'
									})
								} else if (res.data == 0) {
									_this.$refs.uToast.show({
										title: '提交成功',
										type: 'success'
									})
								} else {
									_this.$refs.uToast.show({
										title: '未知错误',
										type: 'error'
									})
								}
							}
						})
					}
				},
				fail() {
					uni.showToast({
						title:'网络错误请稍后重试',
						icon:'none'
					})
				}
			})
		},
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.sex = this.actionSheetList[index].text;
		},
		checkboxGroupChange(e) {
			this.model.subject = e;
			if(this.model.subject.length ==2){
				uni.showToast({
					title:'您最多可以选择两个部门',
					icon:'none'
				})
			}
		},
		codeChange(text){
			this.codeTips = text
		},
		getCode() {
			let _this = this
			if (_this.$refs.uCode.canGetCode) {
				uni.showLoading({
					title: '正在获取验证码',
					mask: true
				});
				uni.request({
					url: _this.baseUrl + "api/get-code/",
					data: {
						phone_vali: _this.model.phone
					},
					method: 'POST',
					success: res => {
						uni.hideLoading()
						if (res.data == -1) {
							_this.$refs.uToast.show({
								title:'服务器出错',
								type: 'error'
							})
						} else {
							setTimeout(() => {
								_this.$refs.uCode.start();
							}, 2000);
							_this.token = res.data
						}
					},
					fail: err => {
						uni.hideLoading()
						_this.$refs.uToast.show({
							title: '服务器无法访问...',
							type: 'error'
						})
					}
				})
			} else {
				this.$refs.uToast.show({
					title: '倒计时结束后再发送',
					type: 'error'
				});
			}
		},
		confirmDate(e){
			this.model.date=e.year+'-'+e.month+'-'+e.day
		}
	}
};
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}
</style>

