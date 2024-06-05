import api from "../api"
import {UpdateUserLearnDat} from "../api/func";
import request from "../until/request";

//更新用户的学习时间
export const updateLearnTime = (time) => {
  return request({
		url: api.Demo.UpdateUserLearnDat,
		method: "PUT",
		data: {
			learnDate: time
		},
	})
}

//查询用户学习时间
export const getLearnTime = () => {
  return request({
		url: api.Demo.GetUserLearnDate,
		method: "GET",
	})
}