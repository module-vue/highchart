import Vue from 'vue';
import axios from 'axios';
import { baseUrl } from './env';
import { getStore } from '../config/utils';
let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

// 请求拦截器
axios.interceptors.request.use(config => {

	// 发起请求时，取消掉当前正在进行的相同请求
	if (promiseArr[config.url]) {
		promiseArr[config.url]('操作取消');
		promiseArr[config.url] = cancel;
	} else {
		promiseArr[config.url] = cancel;
	}

    if (config.url.indexOf('catalog/resCatalog/importCatalog') != -1 && config.url.indexOf('cs/md/importMetaData') != -1 && config.url.indexOf('file/uploadFile') != -1) {
        if (config.method === 'post') {            
            config.data = {                
                ...config.data,                
                t: Date.parse(new Date()) / 1000           
            }       
        } else if (config.method === 'get') {
            if (config.params != '') {          
                config.params = {               
                    t: Date.parse(new Date()) / 1000,               
                    ...config.params            
                }
            } else {
                config.params = {               
                    t: Date.parse(new Date()) / 1000          
                }
            } 
        }
    }

	return config;
}, error => {
	return Promise.reject(error);
});

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response;
}, err => {

    if (err.message.includes('timeout')) {
        err.message = '网络连接超时,请稍后再试';
        Vue.prototype.$message({
           type: 'error',
           message: '网络连接超时,请稍后再试'
        });
    } else {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: err.response.data.message
                    });
                    break;
                case 401:
                    err.message = '权限不足，无法访问该页面'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                        type: 'error',
                        message: '权限不足，无法访问该页面'
                    });
                    history.back();
                    break;
                case 403:
                    err.message = '禁止访问，未绑定IP地址！'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: '禁止访问，未绑定IP地址！'
                    });
                    break;
                case 404:
                    err.message = '请求错误,未找到该资源'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: '请求错误,未找到该资源'
                    });
                    break;
                case 405:
                    err.message = '请求方法未允许'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: '请求方法未允许'
                    });
                    break;
                case 408:
                    err.message = '请求超时'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: '请求超时'
                    });
                    break;
                case 416:
                    err.message = '访问令牌已过期，请重新登录'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                        type: 'error',
                        message: '访问令牌已过期，请重新登录'
                    });
                    break;
                case 500:                
                    err.message = '服务器端出错'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: '服务器端出错'
                    });
                    break;
                case 501:
                    err.message = '网络未实现'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: '网络未实现'
                    });
                    break;
                case 502:
                    err.message = '网络错误'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: '网络错误'
                    });
                    break;
                case 503:
                    err.message = '服务不可用'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: '服务不可用'
                    });
                    break;
                case 504:
                    err.message = '网络超时'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: '网络超时'
                    });
                    break;
                case 505:
                    err.message = 'http版本不支持该请求'
                    Vue.prototype.$message.closeAll();
                    Vue.prototype.$message({
                       type: 'error',
                       message: 'http版本不支持该请求'
                    });
                    break;
                default:
                    err.message = `连接错误${err.response.status}`
            }
        } else {
            err.message = "连接到服务器失败"
        }
    }
    if(err.message.includes('timeout')){
        if (err.response == undefined) {
            err.response = {
                status: 20000 
            };
        } else {
            err.response.status = 20000;
        }
    }
    

    return Promise.resolve(err.response)
})

axios.defaults.baseURL = baseUrl;
//设置默认请求头
axios.defaults.headers = {
    //'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': undefined
};
axios.defaults.timeout = 20000;


export default {
	get (url, param) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url,
				params: param,
				cancelToken: new CancelToken(c => {
					cancel = c;
				})
			}).then(res => {
				resolve(res);
			});
		});
	},
	post (url, param) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url,
				data: param,
				cancelToken: new CancelToken(c => {
					cancel = c;
				})
			}).then(res => {
				resolve(res);
			});
		});
	},
    blobPost(url, params) {
        return new Promise((resolve, reject) => {
            const users = getStore('__dampUsers');
        
            // 异步对象
            let ajax = new XMLHttpRequest();
            let ajaxUrl = baseUrl + url;

            // post请求 url 是不需要改变
            ajax.open('post', ajaxUrl);
            ajax.responseType = 'blob';

            // 需要设置请求报文
            ajax.setRequestHeader('Content-Type', 'application/json');
            ajax.setRequestHeader('If-Modified-Since', '0');
            ajax.setRequestHeader('Cache-Control', 'no-cache');

            if (users) {
                ajax.setRequestHeader('Authorization', JSON.parse(users).accessToken);
            }

            // 发送请求
            if(params == '') {
                ajax.send();
            } else {
                ajax.send(JSON.stringify(params));
            }

            // 注册事件
            ajax.onreadystatechange = function() {
                // 在事件中 获取数据 并修改界面显示
                if (ajax.readyState == 4) {

                    if (ajax.status == 200) {
                        resolve({
                            data: ajax.response != undefined ? ajax.response : ajax.responseText,
                            code: 1
                        });
                    } else if (ajax.status == 201) {
                        resolve({
                            data: {
                                message: 'UC编码无效'
                            },
                            code: 201
                        });
                    } else if (ajax.status == 202) {
                        resolve({
                            data: {
                                message: '超过Excel最大限制'
                            },
                            code: 202
                        });
                    } else if (ajax.status == 204) {
                        resolve({
                            data: {
                                message: '请求参数不能为空'
                            },
                            code: 204
                        });
                    } else if (ajax.status == 205) {
                        resolve({
                            data: {
                                message: '系统正在处理导出数据排队中，请稍后再导出'
                            },
                            code: 205
                        });
                    } else if (ajax.status == 206) {
                        resolve({
                            data: {
                                message: '参数格式不正确'
                            },
                            code: 206
                        });
                    } else {
                        resolve({
                            data: ajax.response != undefined ? ajax.response : ajax.responseText,
                            code: 0
                        });
                    }
                } 
            }
        });
    },
    blobGet(url, params) {
        return new Promise((resolve, reject) => {        
            // 异步对象
            let ajax = new XMLHttpRequest();

            // post请求 url 是不需要改变
            ajax.open('get', url, true);
            ajax.responseType = 'blob';

            // 发送请求
            ajax.send();

            // 注册事件
            ajax.onreadystatechange = function() {
                // 在事件中 获取数据 并修改界面显示
                if (ajax.readyState == 4) {

                    if (ajax.status == 200) {
                        resolve({
                            data: ajax.response != undefined ? ajax.response : ajax.responseText,
                            code: 1
                        });
                    } else {
                        resolve({
                            data: ajax.response != undefined ? ajax.response : ajax.responseText,
                            code: 0
                        });
                    }
                } 
            }
        });
    }
};
