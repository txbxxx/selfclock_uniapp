import api from "../api"
import request from "../until/request";

export function listSchedule(){
    return request({
        url: api.Demo.ListSchedule,
        method: 'get',
    })
}