/* Axios Plus */
import type { AxiosOptions, RequstInterceptors, Respones } from './type'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import AbortAxios from './AbortAxios'

class AxiosPlus {
  /* axios实例, 通过axios.create()方法创建 */
  private axiosInstance: AxiosInstance
  /* 传入的配置 */
  private options: AxiosOptions
  /* 拦截器 */
  private interceptors: RequstInterceptors | undefined

  constructor(options: AxiosOptions) {
    this.axiosInstance = axios.create(options)
    this.options = options
    this.interceptors = options.interceptors
    /* 对拦截器进行初始化注册 */
    this.setInterceptors()
  }

  /**
   * 注册拦截器方法
   */
  setInterceptors() {
    /* 如果配置中并没有传入拦截器，则直接返回 */
    if (!this.interceptors) return

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptor,
      responseInterceptorsCatch,
    } = this.interceptors

    /* 创建取消请求实例 */
    const abortAxios = new AbortAxios()

    /* 挂载请求拦截器 */
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      /* 是否清除重复请求 */
      const abortRepetitiveRequest = this.options.abortRepetitiveRequest
      if (abortRepetitiveRequest) {
        /* 存储请求标识 */
        abortAxios.addPending(config)
      }
      if (requestInterceptors) {
        /* 如果存在请求拦截器，则将 config 先交给 requestInterceptors 做对应的配置。*/
        config = requestInterceptors(config)
      }
      return config
    }, requestInterceptorsCatch ?? undefined)

    /* 挂载响应拦截器 */
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse) => {
        /* 取消请求 */
        abortAxios.removePending(res.config)
        if (responseInterceptor) {
          /* 如果存在响应拦截器，则将返回值先交给 responseInterceptor 做处理 */
          res = responseInterceptor(res)
        }
        if (this.options.directlyGetData) {
          /* 根据 options.directlyGetData 配置选项判断是否直接取得data值 */
          res = res.data
        }
        return res
      },
      (err: AxiosError) => {
        if (responseInterceptorsCatch) {
          /* 如果存在响应错误拦截器，则将返回值先交给 responseInterceptorsCatch 做处理 */
          return responseInterceptorsCatch(this.axiosInstance, err)
        }
        return err
      },
    )
  }

  /* 统一请求方法 */
  request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<Respones, AxiosResponse<Respones>>(config)
        .then((res: AxiosResponse<Respones>) => {
          return resolve(res as unknown as Promise<T>)
        })
        .catch((err: Error | AxiosError) => {
          return reject(err)
        })
    })
  }

  get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default AxiosPlus
