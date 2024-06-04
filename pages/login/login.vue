<template>
	<view>
		<uv-text size="50px" align="center" bold="true" color="#7e1671" margin="100rpx 0 0 0" text="登录"></uv-text>
		<div class="loginFrom">
			<uv-form labelPosition="left" :model="User"  ref="form" :labelStyle="{ color: '#7e1671'}">
				<uv-form-item  borderBottom>
					<uv-input color="#7e1671" prefixIcon="order" v-model="name" placeholder="请输入用户名" border="none" clearable fontSize='20px'>
					</uv-input>
				</uv-form-item>
				<uv-form-item   borderBottom>
					<uv-input color="#7e1671"   prefixIcon="lock" v-model="pwd" placeholder="请输入密码" border="none" clearable password fontSize='20px'>
					</uv-input>
				</uv-form-item>
				<uv-button color="#322f3b" text="登录" customStyle="margin-top: 10px" @click="submit"></uv-button>
			</uv-form>
      <view class="register" style="margin-top: 30rpx">
        <uv-text color="#7e1671"  text="没有账号？"  @click="toRegister"></uv-text>
      </view>
		</div>
	</view>
</template>

<script setup>
import { login } from '../../hook'; // 直接按名称导入login函数
import { reactive, ref ,toRefs} from 'vue';

// 表单数据
const User = reactive({
	name: '',
	pwd: ''
})

// 表单数据，解包
const {name,pwd} = toRefs(User)

// 表单验证规则
// const rules = {
// 	name: {
// 		type: 'string',
// 		required: true,
// 		message: '请填写姓名',
// 		trigger: ['blur', 'change']
// 	},
// 	pwd: {
//     type: 'string',
//     required: true,
//     message: '请填写密码',
//     trigger: ['blur', 'change']
//   },
// }

//登陆操作
const submit = async () => {
 await login(name.value,pwd.value).then((res)=>{
   if (res===null){
     uni.showToast({
       title: '用户名或密码错误',
       icon: 'none'
     })
   }
 })
}

//注册页面
const toRegister = () => {
  uni.redirectTo({
    url: '/pages/register/register',
  })
}


</script>



<style scoped>
	
.loginFrom{
	margin-top: 40px;
}

</style>