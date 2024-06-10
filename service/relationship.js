import api from "../api/";
import request from "../until/request";

//判断登录用户是否有绑定关系
export const judgeRelationship = () => {
	return request({
	    url: api.Demo.JudgeRelationship,
	    method: 'get',
	})
}

//列出和当前用户绑定关系的用户
export const listRelationship = () => {
	return request({
	    url: api.Demo.ListRelationship,
	    method: 'get',
	})
}


//绑定关系
export const bindRelationship = (friendname,relationship) => {
	return request({
		url: api.Demo.BindRelationship,
		method:'post',
		data: {
			friendname: friendname,
			relationship: relationship
		}
	})
}



