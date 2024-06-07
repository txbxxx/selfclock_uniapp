import {listTask,addTask,deleteTask,updateTask} from "../service/index";

//列出所有任务
export async function UserTask_list()
{
    let res = await listTask();
    if(res.code === 200)
    {
        console.log(res.data)
        return res.data;
    }else {
        uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
        });
    }
}

//添加任务
export async function UserTask_add(taskFiled)
{
    let res = await addTask(taskFiled);
    if(res.code === 200)
    {
        return res.data;
    }else {
        uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
        });
    }
}