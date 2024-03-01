import { Get, Post } from '../http'
import { ApiResponse } from '../types'

export function queryUserInfo<T = { name: string }>(): ApiResponse<T> {
  return Get<T>('/system/user/findInfo', {})
}
