import { listSchedule,searchSchedule,addSchedule } from "../service/index";


//列出用户所有日程
export async function UserSchedule_list() {
    try {
        // 查询用户日程
        const res = await listSchedule();

        if (res.code === 200) {
            return res.data; // 直接返回数组数据
        } else {
            uni.showToast({
                title: res.data,
                icon: "none",
                duration: 2000,
            });
        }
    } catch (err) {
        uni.showToast({
            title: "查询失败",
            icon: "none",
            duration: 2000,
        });
    }
}

//查询日程
export async function UserSchedule_query(scheduleFiled) {
    try {
        //查询日程
        const res = await searchSchedule(scheduleFiled);
        if (res.code === 200) {
            return res.data;
        } else {
            uni.showToast({
                title: res.data,
                icon: "none",
                duration: 2000
            });
        }
    } catch (err) {
        uni.showToast({
            title: "查询失败",
            icon: "none",
            duration: 2000
        })
    }
}


//添加日程
export async function UserSchedule_add(scheduleFiled,date,starTime,endTime,endDate){
    // 添加日程
    const res =  await addSchedule(scheduleFiled,date,starTime,endTime,endDate).then((res)=>{
        if (res.code === 200 ){
            uni.showToast({
                title: "添加成功",
                icon: "none",
                duration: 2000
            })
        }else{
            uni.showToast({
                title: "添加失败！！",
                icon: "none",
                duration: 2000
            })
        }
    }).catch(err=>{
        uni.showToast({
            title: "添加失败！！",
            icon: "none",
            duration: 2000
        })
    })

}