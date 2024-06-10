// request.js


// 封装请求方法
const request = (config) => {
    return new Promise((resolve, reject) => {
        uni.request({
            ...config,
            success: (res) => {
                // 请求成功，判断状态码
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(new Error(`请求失败，状态码：${res.statusCode}`));
                }
            },
            fail: (err) => {
                // 请求失败
                reject(err);
            }
        });
    });
};

// 请求拦截器
uni.addInterceptor('request', {
    async invoke(request) {
        console.log(request.url);
        // 如果请求的URL是登录页面，则直接返回请求配置，不进行拦截处理
        if (request.url === '/loginUser' || request.url==='/registerUser') {
            request.url = "http://192.168.31.193:8081" + request.url;
            return request;
        }
        // 在发送请求之前做些什么
        request.url = "http://192.168.31.193:8081" + request.url;


        // 在这里可以对请求参数进行修改等操作
        request.header = {
            ...request.header,
            'satoken': uni.getStorageSync('satoken')
        };

        // console.log('请求拦截器 - 发送请求后:', request);
        // 返回修改后的请求配置
        return request;
    }
});

// 响应拦截器
uni.addInterceptor('response', {
    async invoke(response) {
        // 对响应数据做点什么
        // console.log('响应拦截器 - 收到响应:', response);

        // 在这里可以处理响应数据、统一处理错误等操作
        if (response.statusCode !== 200) {
            uni.showToast({
                title: '请求失败',
                icon: 'none'
            });
        }
        // 返回修改后的响应数据
        return response;
    }
});

export default request;
