import type { AxiosInstance, AxiosError } from 'axios'

export default function retry(instance: AxiosInstance, err: AxiosError) {
  // eslint-disable-next-line
  const config: any = err.config
  const { waitTime, count } = config.retryConfig ?? {}
  config.currentCount = config.currentCount ?? 0
  console.log(`第${config.currentCount}次重连`)
  if (config.currentCount >= count) {
    return Promise.reject(err)
  }
  config.currentCount++
  return wait(waitTime).then(() => instance(config))
}

function wait(waitTime: number) {
  return new Promise((resolve) => setTimeout(resolve, waitTime))
}
