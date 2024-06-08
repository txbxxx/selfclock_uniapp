import api from "../api/index.js";
import {ListCountDownOverFalse} from "../api/func";
import request from "../until/request";

//列出所有未完成倒计时卡片
export async function listCountdownCard() {
  return request({
    url: api.Demo.ListCountDownOverFalse,
    method: "GET",
  });
}



//添加倒计时
export async function addCountdownCard(countdownName, countdownDay) {
  return request({
    url: api.Demo.AddCountDown,
    method: "POST",
    data: {
      countdownName: countdownName,
      countdownDay: countdownDay
    },
  });
}

//删除倒计时
export async function deleteCountdownCard(countdownName) {
  return request({
    url: api.Demo.DeleteCountDown,
    method: "DELETE",
    data: {
      countdownName: countdownName,
    },
  });
}


//更新倒计时
export async function updateCountdownCard() {
  return request({
    url: api.Demo.UpdateCountDownPastDay,
    method: "get",
  });
}
