import * as Demo  from '../api/index.js'
import api from "../api"
import request from "../until/request";

//登录
export const Login = (user,pwd) => {
	return request({
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
	return request({
		url: api.Demo.Register,
		method: "POST",
		data: {
			username: user,
			password: pwd
		}
	})
}

//通过id来查询用户
export const GetUserById = (id) => {
	return request({
		url: api.Demo.GetUserById,
		method: "get",
		data:{
			id: id
		}
	})
}
