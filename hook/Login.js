import {Login, Register} from "../service/index"
 

export  async function login(user,pwd) {
	const res =  await Login(user,pwd).then((res)=>{
		if (res.data.code === 200 ){
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
			uni.setStorageSync('satoken', res.data.data)
		}else{
			log(res.data.data)
			// 弹出失败信息
			uni.showToast({
				title: "登录失败请检查账户名和密码",
				icon: 'error',
				duration: 2000,
				position: 'top'
			})
		}
	}).catch(err=>{
		log(res.data.data)
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
		if (res.data.code === 200 ){
			// 登录成功跳转
			uni.redirectTo({
				url: '/pages/login/login',
			})
			//登录后存储Token
			uni.setStorageSync('satoken', res.data.data)
		}else{
			console.log(res)
		}
	}).catch(err=>{
		console.log(err)
	})
}