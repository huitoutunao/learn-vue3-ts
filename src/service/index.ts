import { RequstInterceptors } from './type'
import type { AxiosError } from 'axios'
import axios from 'axios'
import AxiosPlus from './Axios'
import checkErrStatus from './checkErrStatus'
import retry from './axiosRetry'
import staticAxiosConfig from './config'

const _RequstInterceptors: RequstInterceptors = {
  requestInterceptors(config) {
    return config
  },
  requestInterceptorsCatch(err) {
    return err
  },
  responseInterceptor(config) {
    return config
  },
  responseInterceptorsCatch(axiosInstance, err: AxiosError) {
    const message = err.code === 'ECONNABORTED' ? '请求超时' : undefined
    if (axios.isCancel(err)) {
      return Promise.reject(err)
    }
    console.log(err)
    checkErrStatus((err as AxiosError).response?.status, message, (message) => console.log(message))
    return retry(axiosInstance, <AxiosError>err)
  },
}

const $http = new AxiosPlus({
  directlyGetData: true,
  baseURL: staticAxiosConfig.baseUrl,
  timeout: 60000,
  interceptors: _RequstInterceptors,
  abortRepetitiveRequest: true,
  retryConfig: {
    count: 3,
    waitTime: 500,
  },
})

export default $http
