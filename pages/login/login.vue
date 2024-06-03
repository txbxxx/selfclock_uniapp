<template>
	<view>
		<div class="loginFrom">
			<uv-form labelPosition="left" :model="User" :rules="rules" ref="form" :labelStyle="{ color: '#d1c2d3'}">
				<uv-form-item label="用户"   borderBottom>
					<uv-input color="#d1c2d3" v-model="name" placeholder="请输入用户名" border="none" clearable fontSize='20px'>
					</uv-input>
				</uv-form-item>
				<uv-form-item label="密码"  borderBottom>
					<uv-input color="#d1c2d3" v-model="pwd" placeholder="请输入密码" border="none" clearable password fontSize='20px'>
					</uv-input>
				</uv-form-item>
				<uv-button type="primary" text="登录" customStyle="margin-top: 10px" @click="submit"></uv-button>
			</uv-form>
		</div>
	</view>
</template>

<script setup>
import { login } from '../../hook/index.js'; // 直接按名称导入login函数
import { ref } from 'vue';


const User = ref({
	name: '',
	pwd: ''
})

const rules = ref({
	name: {
		type: 'string',
		required: true,
		message: '请填写姓名',
		trigger: ['blur', 'change']
	},
	pwd:''
})

const submit = () => {
  login(User.name,User.pwd).then(res => {
    console.log(res)
  })
  console.log(User)
}


</script>



<style scoped>
	
.loginFrom{
	margin-top: 200px;
}

</style>