export type Fn = (data: FcResponse<any>) => unknown

export interface IAnyObj {
  [index: string]: unknown
}

export interface FcResponse<T> {
  code: number
  msg: string
  total: number
  rows: T
  data: T
}

export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>
