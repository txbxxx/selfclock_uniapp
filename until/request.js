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
        try {
            const key = uni.getStorageSync('satoken');
            const baseUrl = "http://192.168.31.193:8081";

            if (request.url === '/loginUser' || request.url === '/registerUser') {
                request.url = baseUrl + request.url;
            } else if (key) {
                console.log("拦截成功！");
                console.log("获取 satoken: " + key);
                request.url = baseUrl + request.url;
                request.header = {
                    ...request.header,
                    'satoken': key
                };
            } else {
                uni.redirectTo({
                     url: '/pages/login/login'
                });
                uni.showToast({ title: "请登录" })
            }

            // console.log('请求拦截器 - 发送请求后:', request);
            return request;
        } catch (error) {
            console.error('请求拦截器错误:', error);
            return Promise.reject(error);
        }
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
            return Promise.reject(new Error(`请求失败，状态码：${response.statusCode}`));
        }

        // 返回响应数据
        return response;
    }
});

export default request;
