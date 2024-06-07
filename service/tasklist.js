import api from "../api"
import request from "../until/request";
import {ListTask} from "../api/func";


//列出所有任务
export function listTask() {
    return request({
        url: api.Demo.ListTask,
        method: 'get',
    })
}

//添加任务
export function addTask(taskFiled,taskname,tasklevel) {
    return request({
        url: api.Demo.AddTask,
        method: 'post',
        data: {
            taskname: taskname,
            taskstr: taskFiled,
            tasklevel:tasklevel
        }
    })
}

//删除任务
export function deleteTask(taskname) {
    return request({
        url: api.Demo.DeleteTask,
        method: 'delete',
        data: {
            taskname: taskname,
        }
    })
}

//更新任务
export function updateTask(taskFiled,taskname,tasklevel,oldtaskname) {
    return request({
        url: api.Demo.UpdateTask,
        method: 'put',
        data: {
            taskname: taskname,
            taskstr: taskFiled,
            tasklevel: tasklevel,
            oldtaskname: oldtaskname,
        }
    })
}

//更新任务状态
export function updateTaskStatus(taskname,taskstatus) {
    return request({
        url: api.Demo.UpdateTaskStatus,
        method: 'put',
        data: {
            taskname: taskname,
            taskstatus: taskstatus,
        }
    })
}

//查询任务
export function searchTask(taskName,taskFiled) {
    return request({
        url: api.Demo.SearchTask,
        method: 'get',
        data: {
            taskstr: taskFiled,
            taskName: taskName
        }
    })
}