/**
 * 配置开发、测试、生产环境
 * 
 * baseUrl: 域名地址
 * openUrl: 登录接口
 * imgUrl: 图片所在域名地址
 * 
 */
let NODE_SCENE = process.env.NODE_SCENE,
    NODE_ENV = process.env.NODE_ENV,
    baseUrl = '',
    headerName = '',
    footerName = '';

if (NODE_SCENE == 'build') {
    switch (NODE_ENV) {
        case 'offline':
            baseUrl = 'http://0.0.0.0/';
            break;
        case 'dev':
            baseUrl = 'http://0.0.0.0/';
            break;
        case 'test':
            baseUrl = 'http://0.0.0.0/';
            break;
        case 'prod':
            baseUrl = 'http://0.0.0.0/';
            break;
    }
} else {
    baseUrl = '/api/';
}

switch (NODE_ENV) {
    case 'offline':
        headerName = '网站名称-offline';
        footerName = 'XXX-版权所有-offline';
        break;
    case 'dev':
        headerName = '网站名称-dev';
        footerName = 'XXX-版权所有-dev';
        break;
    case 'test':
        headerName = '网站名称-test';
        footerName = 'XXX-版权所有-test';
        break;
    case 'prod':
        headerName = '网站名称-prod';
        footerName = 'XXX-版权所有-prod';
        break;
}

export {
    baseUrl,
    headerName,
    footerName
}
