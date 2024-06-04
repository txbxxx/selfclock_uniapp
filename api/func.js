const Url = "http://192.168.31.193:8081"
//用户登录接口
export const Login = Url+'/loginUser'

//用户注册接口
export const Register = Url+'/registerUser'

//检查用户是否登录接口
// export const  checkLogin = '/checkLogin'


//用户登出接口
export const Logout = Url+'/logoutUser'


//列出用户所有日程
export const ListSchedule = Url+'/findAllSchedule'

//添加日程接口
export const AddSchedule = Url+'/addSchedule'

//删除日程接口
export const DeleteSchedule = '/deleteSchedule'

//获取当前用户登录的id
export const GetUserId = '/getLoginUser'


//获取当前用户的任务列表
export const ListTask = '/listUserTask'

//修改任务内容
export const UpdateTask = '/updateTask'

//添加任务
export const AddTask = '/addUserTask'

//删除任务
export const DeleteTask = '/deleteUserTask'


//列出用户未完成的倒计时
export const ListCountDownOverFalse = '/listCountDownOverFalse'

//添加倒计时
export const AddCountDown = '/addCountDown'

//删除倒计时
export const DeleteCountDown = '/deleteCountDown'