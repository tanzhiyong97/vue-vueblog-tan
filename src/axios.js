import axios from 'axios'
import Element from 'element-ui'
import store from "./store"
import router from "./router"
axios.defaults.baseURL = 'http://localhost:8081'
axios.interceptors.request.use(config => {
    console.log("前置拦截")
    //可以统一设置请求头
    return config
})
axios.interceptors.response.use(response => {
    const res = response.data;
    console.log(res)
    console.log("后置拦截")
    if (res.code === 200) {
        return response
    } else {
        //弹窗异常信息
        Element.Message.error('错了哦，这是一条错误信息')
        //直接拒接往下面返回结果信息
        return Promise.reject(response.data.msg)
        }
    },
error => {
    console.log('err' + error) //for debug
    if(error.response.data){
        error.message = error.response.data.msg
    }

    if(error.response.status === 401) {
        store.commit("REMOVE_INFO")
        router.push("/login")
    }

    Element.Message.error(error.message)
        return Promise.reject(error)
    }
)
