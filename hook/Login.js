import {Login} from "../service/index"
 

export  async function login(user,pwd) {
	const res =  await Login(user,pwd).then((res)=>{
		if (res.code === 200 ){
			// 登录成功跳转
			console.log(res)
			//登录后存储Token
			uni.setStorageSync('token', res.data)
		}else{
			console.log(res)
		}
	}).catch(err=>{
		console.log(err)
	})
}