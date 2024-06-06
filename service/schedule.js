import api from "../api"
import request from "../until/request";

//列出用户所有日程
export function listSchedule(){
    return request({
        url: api.Demo.ListSchedule,
        method: 'get',
    })
}

//查询日程
export function searchSchedule(scheduleFiled){
    return request({
        url: api.Demo.SearchSchedule,
        method: 'post',
        data: {
            scheduleFiled: scheduleFiled
        }
    })
}

//添加日程
export function addSchedule(scheduleFiled,date,starTime,endTime,endDate){
    return request({
        url: api.Demo.AddSchedule,
        method: 'post',
        data: {
            scheduleFiled: scheduleFiled,
            date: date,
            starTime: starTime,
            endTime: endTime,
            endDate: endDate
        }
    })
}