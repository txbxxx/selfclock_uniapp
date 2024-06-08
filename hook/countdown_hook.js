import {listCountdownCard,addCountdownCard,deleteCountdownCard} from "../service/index";

//列出所有未完成的倒计时
export async function UserCountdown_list()
{
  let res = await listCountdownCard();
  if (res.code === 200){
      return res.data;
  }else{
      uni.showToast({
          icon: 'none',
          title: "获取倒计时列表失败",
          duration: 2000
      });
  }
}

//添加倒计时
export async function UserCountdown_add(countdownName, countdownDay)
{
  let res = await addCountdownCard(countdownName, countdownDay);
  if (res.code === 200){
      uni.showToast({
          icon: 'none',
          title: "添加倒计时成功",
          duration: 2000
      });
  }else{
      uni.showToast({
          icon: 'none',
          title: "添加倒计时失败",
          duration: 2000
      });
  }
}


//删除倒计时
export async function UserCountdown_delete(countdownName)
{
  let res = await deleteCountdownCard(countdownName);
  if (res.code === 200){
      uni.showToast({
          icon: 'none',
          title: "删除倒计时成功",
          duration: 2000
      });
  }else{
      uni.showToast({
          icon: 'none',
          title: "删除倒计时失败",
          duration: 2000
      });
  }
}