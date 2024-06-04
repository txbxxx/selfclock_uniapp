import * as Demo  from '../api/index.js'
import api from "../api"

//登录
export const Login = (user,pwd) => {
	return uni.request({
		url: api.Demo.Login,
		method: "POST",
		data: {
			username: user,
			password: pwd
		}
	})
}

//注册功能
export const Register = (user,pwd) => {
	return uni.request({
		url: api.Demo.Register,
		method: "POST",
		data: {
			username: user,
			password: pwd
		}
	})
}
