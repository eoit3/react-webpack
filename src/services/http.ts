import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Qs from 'qs' // 引入qs模块，用来序列化post类型的数据
import { checkStatus } from './tool'
import { IAnyObj, Fn, FcResponse } from './types'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

let inError = false

instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Basic '
    Object.assign(
      config.method === 'get'
        ? {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
          }
        : {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
      config.headers
    )
    if (config.method === 'post') {
      const contentType = config.headers['Content-Type']
      // 根据Content-Type转换data格式
      if (contentType && typeof contentType === 'string') {
        if (contentType.includes('multipart')) {
          // 类型 'multipart/form-data;'
          // config.data = data;
        } else if (contentType.includes('json')) {
          // 类型 'application/json;'
          // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
          config.data = JSON.stringify(config.data)
        } else {
          // 类型 'application/x-www-form-urlencoded;'
          // 服务器收到的raw body(原始数据) name=nowThen&age=18
          config.data = Qs.stringify(config.data)
        }
      }
    }
    return Promise.resolve(config)
  },
  error =>
    // 对请求错误做处理...
    Promise.reject(error)
)

// 实例添加响应拦截器
instance.interceptors.response.use(
  response => {
    const { code } = response.data || {}
    if (code === 109 || code === 108) {
      // 请求超时，跳转登录页
      if (!inError) {
        // message.warning('登录超时，即将跳转到登录页面...');
        inError = true
        setTimeout(() => {
          // message.destroy();
          window.location.href = '/login'
          inError = false
        }, 2000)
      }

      return Promise.resolve({})
    } else if (response) {
      return Promise.resolve(checkStatus(response))
    }
    return Promise.resolve(response)
  },
  error => {
    // 对响应错误做处理...
    // console.log(error);
    if (error.response) {
      return Promise.reject(checkStatus(error.response))
    } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      return Promise.reject({ msg: '请求超时' })
    } else {
      return Promise.reject({})
    }
  }
)

export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  clearFn?: Fn
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise(resolve => {
    instance
      .get(url, { params })
      .then((result: { data: FcResponse<any> }) => {
        let res: FcResponse<T>
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>
        } else {
          res = result.data as FcResponse<T>
        }
        resolve([null, res as FcResponse<T>])
      })
      .catch((err: any) => {
        resolve([err, undefined])
      })
  })

export const Post = <T>(
  url: string,
  data: IAnyObj | FormData,
  params: AxiosRequestConfig = {}
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise(resolve => {
    instance
      .post(url, data, { ...params })
      .then((result: { data: FcResponse<T> }) => {
        resolve([null, result.data as FcResponse<T>])
      })
      .catch((err: any) => {
        resolve([err, undefined])
      })
  })
}

export const Download = <T>(
  url: string,
  data: FormData,
  params: AxiosRequestConfig = {}
): Promise<[any, BlobPart, string]> => {
  return new Promise(resolve => {
    instance
      .post(url, data, { ...params })
      .then((result: AxiosResponse) => {
        let filename = result.headers['content-disposition'].split('filename=')[1]
        resolve([null, result.data, filename])
      })
      .catch((err: any) => {
        resolve([err, '', ''])
      })
  })
}
