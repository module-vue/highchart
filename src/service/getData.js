import req from '../config/axios';

// 用户登录
export const login = param => {
	return req.post('system/auth/login', param);
};


