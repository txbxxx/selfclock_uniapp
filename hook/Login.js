import {Login} from "../service/index"
 

export  async function login(user,pwd) {
	const res =  await Login(user,pwd).then((res)=>{
		if (res.data.code === 200 ){
			// 登录成功跳转
			uni.redirectTo({
				url: '/pages/index/index',
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