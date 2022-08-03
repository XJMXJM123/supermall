import axios from 'axios';

export function request(config) {
    //1.创建aixos实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })


    //2.1.axios的拦截器
    instance.interceptors.response.use(config => {
        return config
    }, err => {
        // console.log(err)
    })

    //2.2相应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        window.console.log(err);
    })

    return instance(config)
}