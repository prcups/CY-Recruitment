<template>
	<view class="wrap">
		<view>
			<u-toast ref="uToast" />
		</view>

		<u-form :model="model" :rules="rules" ref="uForm" :errorType="['message']">
			<u-form-item :leftIconStyle="{ color: '#888', fontSize: '32rpx' }" left-icon="account" label-width="120" :label-position="'left'" label="姓名" prop="name">
				<u-input :border="false" placeholder="请输入姓名" v-model="model.name" type="text"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="性别" prop="sex">
				<u-input :border="false" type="select" :select-open="actionSheetShow" v-model="model.sex" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="出生日期" prop="date" label-width="150">
				<u-input :border="false" type="select" :select-open="date_show" v-model="model.date" placeholder="请选择出生日期" @click="date_show = true"></u-input>
			</u-form-item>

			<u-form-item
				:rightIconStyle="{ color: '#888888', fontSize: '32rpx' }"
				right-icon="kefu-ermai"
				:label-position="'left'"
				label="手机号码"
				prop="phone"
				label-width="150"
			>
				<u-input :border="false" placeholder="请输入手机号" v-model="model.phone" type="number"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="验证码" prop="code" label-width="150">
				<u-input :border="false" placeholder="请输入验证码" v-model="model.code" type="text"></u-input>
				<u-button slot="right" type="success" size="mini" :disabled="phoneNotRight" @click="getCode">{{ codeTips }}</u-button>
			</u-form-item>

			<u-form-item :label-position="'left'" label="QQ" prop="qq_number">
				<u-input :border="false" placeholder="请输入qq号" v-model="model.qq_number" type="text"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="上传自己的照片" prop="photo" label-width="200">
				<u-upload width="200" @on-uploaded="onUploaded" name="photo" :action="imageUpload"></u-upload>
			</u-form-item>

			<u-form-item :label-position="'left'" label="所在学院和专业" prop="major" label-width="200">
				<u-input :border="false" placeholder="请输入所在学院和专业" v-model="model.major" type="text"></u-input>
			</u-form-item>

			<u-form-item :label-position="'left'" label="部门选择" label-width="150" prop="subject">
				<u-checkbox-group @change="checkboxGroupChange" :width="'auto'" :wrap="false">
					<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">{{ item.name }}</u-checkbox>
				</u-checkbox-group>
			</u-form-item>

			<u-form-item :label-position="'left'" label="简介" prop="intro">
				<u-input type="textarea" :border="false" placeholder="请填写简介(不超过2000字)" v-model="model.intro" />
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
				{ name: '秘书处', checked: false, disabled: false },
				{ name: '网技', checked: false, disabled: false },
				{ name: '摄影', checked: false, disabled: false },
				{ name: '音视频', checked: false, disabled: false },
				{ name: '采编', checked: false, disabled: false },
				{ name: '设计', checked: false, disabled: false },
				{ name: '运营', checked: false, disabled: false }
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
			actionSheetShow: false
		};
	},
	computed: {
		imageUpload() {
			return this.baseUrl + "api/get-photo/"
		},
	},
	onReady() {
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
		},
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.sex = this.actionSheetList[index].text;
		},
		checkboxGroupChange(e) {
			this.model.subject = e;
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

<style scoped lang="scss" scoped>
.wrap {
	padding: 30rpx;
}
</style>

