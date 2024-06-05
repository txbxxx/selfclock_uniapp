import { updateLearnTime,getLearnTime } from "../service/index";

//更新用户的学习时长
export async function updateUserLearnData(time){
    const  res = await updateLearnTime(time).then((res)=>{
        if (res.code === 200){
            uni.showToast({
                title: '更新成功',
                icon: 'none',
                duration: 2000
            });
        }else {
            uni.showToast({
                title: '更新失败',
                icon: 'none',
                duration: 2000
            });
        }
    })
}

//获取用户学习时间
export async function getUserLearnData(){
    const  res = await getLearnTime()
    if (res.code === 200){
        return res.data
    }else {
        uni.showToast({
            title: '获取失败',
            icon: 'none',
            duration: 2000
        });
    }
}