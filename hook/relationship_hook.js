import {judgeRelationship,bindRelationship,listRelationship,deleteRelationship} from "../service/index";

//判断登录是否存在关系
export async function JudgeRelationshipSearch() {
  const res = await judgeRelationship();
  if (res.code === 200) {
    return res.data;
  } else {
    console.log(res);
    uni.showToast({
        title: '获取用户绑定关系失败',
        icon: 'none',
        duration: 2000
    })
    return false;
  }
}


//列出和当前用户绑定关系的用户
export async function ListRelationship() {
    const res = await listRelationship();
    if (res.code === 200) {
      return res.data;
    } else {
      console.log(res);
      uni.showToast({
          title: '获取用户绑定用户失败',
          icon: 'none',
          duration: 2000
      })
      return false;
    }
}

//用户绑定关系
export async function BindRelationship(friendname,relationship){
    const res  = bindRelationship(friendname,relationship).then((res) => {
        if (res.code === 200) {
            console.log(res);
            uni.showToast({
                title: '绑定关系成功！！',
                icon: 'none',
                duration: 2000
            })
        }else {
            console.log(res);
            uni.showToast({
                title: '绑定关系失败',
                icon: 'none',
                duration: 2000
            })
        }
    })

}

//解除绑定
export async function DeleteRelationship(friendname) {
    const res = deleteRelationship(friendname)
    console.log(res);
    if(res.code === 200){
        uni.showToast({
            title: "世上没有后悔药哦！",
            icon: "none",
            duration: 3000
        })
    }else{
        uni.showToast({
            title: "系统出错啦（不让你们分开啦！）",
            icon: "none",
            duration: 3000
        })
    }
}