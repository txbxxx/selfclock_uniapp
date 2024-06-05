import { listSchedule } from "../service/index";

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
        console.error(err);
        uni.showToast({
            title: "查询失败",
            icon: "none",
            duration: 2000,
        });
    }
}