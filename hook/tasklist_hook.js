import {listTask,addTask,deleteTask,updateTask,updateTaskStatus,searchTask} from "../service/index";

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
export async function UserTask_add(taskFiled,taskname,tasklevel)
{
    let res = await addTask(taskFiled,taskname,tasklevel);
    if(res.code === 200)
    {
        uni.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000
        });
    }else {
        uni.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
        });
    }
}

//删除任务
export async function UserTask_delete(taskname)
{
    let res = await deleteTask(taskname);
    if(res.code === 200)
    {
        uni.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 2000
        });
    }else {
        uni.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
        });
    }
}


//更新任务
export async function UserTask_update(taskFiled,taskname,tasklevel,oldtaskname)
{
    let res = await updateTask(taskFiled,taskname,tasklevel,oldtaskname);
    if(res.code === 200)
    {
        console.log(res.data)
        uni.showToast({
            title: '更新成功',
            icon: 'none',
            duration: 2000
        });
    }else {
        uni.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
        });
    }
}

//更新用户状态
export async function UserTask_updateStatus(taskname,taskstatus)
{
    let res = await updateTaskStatus(taskname,taskstatus);
    if(res.code === 200)
    {
        uni.showToast({
            title: '任务完成啦，你又变厉害了！',
            icon: 'none',
            duration: 2000
        });
    }else {
        uni.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
        });
    }
}

//查询用户
export async function UserTask_search(taskFiled)
{
    let res = await searchTask(taskFiled);
    if(res.code === 200)
    {
        console.log(res.data)
        return res.data;
    }else {
        uni.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
        });
    }
}