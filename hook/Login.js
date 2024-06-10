import {Login, Register,GetUserById} from "../service/index"
 

export  async function login(user,pwd) {
	const res =  await Login(user,pwd).then((res)=>{
		if (res.code === 200 ){
			// 登录成功跳转
			uni.redirectTo({
				url: '/pages/index/index',
			})
			//打印成功信息
			uni.showToast({
				title: '登录成功',
				icon: 'success',
				duration: 2000,
				position: 'top'
			})
			//登录后存储Token
			uni.setStorageSync('satoken', res.data)
			console.log(uni.getStorageSync('satoken'))
		}else{
			console.error(res.data)
			// 弹出失败信息
			uni.showToast({
				title: "登录失败请检查账户名和密码",
				icon: 'error',
				duration: 2000,
				position: 'top'
			})
		}
	}).catch(err=>{
		console.error(res.data)
		// 弹出失败信息
		uni.showToast({
			title: "登录失败，请联系管理员",
			icon: 'error',
			duration: 2000,
			position: 'top'
		})
	})
}


//注册
export async function register(user,pwd) {
	const res = await Register(user,pwd).then((res)=>{
		if (res.code === 200 ){
			console.log(res)
			// 注册成功跳转道登录界面
			uni.redirectTo({
				url: '/pages/login/login',
			})
			//打印成功信息
			uni.showToast({
				title: '注册成功',
				icon: 'success',
				duration: 2000,
				position: 'top'
			})
		}else{
			//打印失败信息
			uni.showToast({
				title: "注册失败",
				icon: 'error',
				duration: 2000,
				position: 'top'
			})
			console.log(res)
		}
	}).catch(err=>{
		// 打印失败信息
		uni.showToast({
			title: "注册失败，请联系管理员",
			icon: 'error',
			duration: 2000,
			position: 'top'
		})
		console.log(err)
	})
}


//通过id查询用户
export async function getUserById(id) {
	const res = GetUserById(id);
	if (res === 200){
		return res.data;
	}else{
		uni.showToast({
			title: "查找失败",
			icon: "none",
			duration: 3000,
		})
	}
}