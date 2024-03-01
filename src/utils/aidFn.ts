import { parse, stringify } from 'qs'
import html2canvas from 'html2canvas'

export const getEnv = () => {
  let env
  if (
    typeof process !== 'undefined' &&
    Object.prototype.toString.call(process) === '[object process]'
  ) {
    env = 'NODE'
  }
  if (typeof XMLHttpRequest !== 'undefined') {
    env = 'BROWSER'
  }
  return env
}

export const isArray = (val: any) =>
  typeof val === 'object' && Object.prototype.toString.call(val) === '[object Array]'

export const isURLSearchParams = (val: any) =>
  typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams

export const isDate = (val: any) =>
  typeof val === 'object' && Object.prototype.toString.call(val) === '[object Date]'

export const isObject = (val: any) => val !== null && typeof val === 'object'

export const getParamObject = (val: string) => {
  if (isURLSearchParams(val)) {
    return parse(val.toString(), { strictNullHandling: true })
  }
  if (typeof val === 'string') {
    return [val]
  }
  return val
}

export const reqStringify = (val: any) =>
  stringify(val, { arrayFormat: 'repeat', strictNullHandling: true })

export const getType = (obj: any) => {
  const type = typeof obj
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(obj).replace(/^$/, '$1')
}

export const hidePhone = (phone: string) => phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

// asyncAction(action)(callback)
export const asyncAction = (action: any) => {
  const wait = Promise.resolve(action)
  return (cb: Function) => {
    wait.then(() => setTimeout(() => cb()))
  }
}

export const getImgsUrl = (html: string) => {
  const imgReg = /<img.*?(?:>|\/>)/gi
  const srcReg = /src=['"]?([^'"]*)['"]?/i
  const arr = html.match(imgReg)
  if (!arr) return null
  const urlArr = arr.reduce((prev: string[], next) => {
    const src = next.match(srcReg)

    return src && src[1] ? [...prev, src[1]] : prev
  }, [])
  return urlArr
}

interface CustomizeTimer {
  intervalTimer: number | null
  timeoutTimer: number | null
  setTimeout(cb: Function, interval: number): void
  setInterval(cb: Function, interval: number): void
  clearTimeout(): void
  clearInterval(): void
}

export const customizeTimer: CustomizeTimer = {
  intervalTimer: null,
  timeoutTimer: null,
  setTimeout(cb: Function, interval: number) {
    const { now } = Date
    const stime = now()
    let etime = stime
    const loop = () => {
      this.timeoutTimer = requestAnimationFrame(loop)
      etime = now()
      if (etime - stime >= interval) {
        cb()
        cancelAnimationFrame(this.timeoutTimer)
      }
    }
    this.timeoutTimer = requestAnimationFrame(loop)
    return this.timeoutTimer
  },
  clearTimeout() {
    if (this.timeoutTimer) {
      cancelAnimationFrame(this.timeoutTimer)
    }
  },
  setInterval(cb, interval) {
    const { now } = Date
    let stime = now()
    let etime = stime
    const loop = () => {
      this.intervalTimer = requestAnimationFrame(loop)
      etime = now()
      if (etime - stime >= interval) {
        stime = now()
        etime = stime
        cb()
      }
    }
    this.intervalTimer = requestAnimationFrame(loop)
    return this.intervalTimer
  },
  clearInterval() {
    if (this.intervalTimer) {
      cancelAnimationFrame(this.intervalTimer)
    }
  }
}

export const isDecimal = (value: string) => {
  const reg = /(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/
  return reg.test(value)
}

export const limitDecimal = (val: string) => val.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')

/*
 ** 判断用户是否离开当前页面
 */
export const checkIsLocalPage = () => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      return false
    }
    if (document.visibilityState === 'visible') {
      return true
    }
    window.addEventListener(
      'pagehide',
      event => {
        if (event.persisted) {
          /* the page isn't being discarded, so it can be reused later */
        }
      },
      false
    )
  })
}

// Generate Random Hex
export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`

// Clear All Cookies
export const clearCookies = document.cookie
  .split(';')
  .forEach(
    cookie =>
      (document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/[=].*/, `=;expires=${new Date(0).toUTCString()};path=/`))
  )

// Find the number of days between two days
export const dayDif = (date1: Date, date2: Date) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

// Capitalize a String
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

// Check if the array is empty
export const isNotEmpty = (arr: any[]) => Array.isArray(arr) && arr.length > 0

// Detect Dark Mode
export const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

export const fetchSomething = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, 1000)
  })

export const toFixed = (number: number, m: number) => {
  if (typeof number !== 'number') {
    throw new Error('number不是数字')
  }
  let result: string | number = Math.round(10 ** m * number) / 10 ** m
  result = String(result)
  if (result.indexOf('.') === -1) {
    if (m !== 0) {
      result += '.'
      result += new Array(m + 1).join('0')
    }
  } else {
    const arr = result.split('.')
    if (arr[1].length < m) {
      arr[1] += new Array(m - arr[1].length + 1).join('0')
    }
    result = arr.join('.')
  }
  return result
}
export const toFixedBug = (n: number, fixed: number) => ~~(10 ** fixed * n) / 10 ** fixed

export const promiseWithTimeout = (promise: Promise<any>, timeout: number) => {
  const timeoutPromise = new Promise(resolve => setTimeout(() => resolve('Time Out!'), timeout))
  return Promise.race([timeoutPromise, promise])
}

export const shuffleArr = (arr: any[]) => arr.sort(() => 0.5 - Math.random())
export const sleep = (time: number) => new Promise(resolve => setTimeout(() => resolve(''), time))
export const ThousandNum = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
export const RandomId = (len: number) => Math.random().toString(36).substring(3, len)
export const RoundNum = (num: number, decimal: number) =>
  Math.round(num * 10 ** decimal) / 10 ** decimal
export const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const isEmptyArray = (arr: any[]) => Array.isArray(arr) && !arr.length
export const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]
export const asyncTo = (promise: Promise<any>) =>
  promise.then(data => [null, data]).catch(err => [err])
export const hasFocus = (element: HTMLElement) => element === document.activeElement
export const isEqual = (a: Object, b: Object) => JSON.stringify(a) === JSON.stringify(b)
export const randomString = () => Math.random().toString(36).slice(2)
export const toCamelCase = (str: string) =>
  str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)
export const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`
export const pause = (millions: number) => new Promise(resolve => setTimeout(resolve, millions))
export const camelizeCamelCase = (str: string) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, '')

export const copyTextToClipboard = async (textToCopy: string) => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy)
      console.log('已成功复制到剪贴板')
    }
  } catch (err: any) {
    console.error(`复制到剪贴板失败:${err.message}`)
  }
}

export const getRandomId = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// https://github.com/Azure/fetch-event-source
// https://github.com/mpetazzoni/sse.js
// https://nodejs.org/api/http.html#httprequesturl-options-callback
export const oneApiChat = (chatList: any[], token: string, signal: RequestInit['signal']) =>
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    signal,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: chatList,
      stream: true
    })
  })

export const getCurrentDate = () => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export const exportJsonData = (data: string) => {
  const date = getCurrentDate()
  const jsonString = JSON.stringify(JSON.parse(data), null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `chat-store_${date}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const saveHtmlToPng = async (
  eleHtml: HTMLElement,
  successFun: Function,
  errorFun: Function
) => {
  try {
    const ele = eleHtml ?? document.getElementById('image-wrapper')
    const canvas = await html2canvas(ele, {
      useCORS: true
    })
    const imgUrl = canvas.toDataURL('image/png')
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = imgUrl
    tempLink.setAttribute('download', 'chat-shot.png')
    if (typeof tempLink.download === 'undefined') tempLink.setAttribute('target', '_blank')

    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(imgUrl)
    if (successFun) successFun()
    Promise.resolve()
  } catch (error: any) {
    if (errorFun) errorFun(error.message)
  }
}

export const trimTopic = (topic: string) => topic.replace(/[，。！？”“"、,.!?]*$/, '')

// onClick={() => importFromFile()}
// readFromFile().then((content) => { JSON.parse(content)})

export const readFromFile = () =>
  new Promise((res, rej) => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'application/json'

    fileInput.onchange = (event: Event) => {
      if (event.target) {
        // @ts-ignore
        const file = event.target.files && event.target.files[0]
        const fileReader = new FileReader()
        fileReader.onload = (e: any) => {
          res(e.target.result)
        }
        fileReader.onerror = e => rej(e)
        fileReader.readAsText(file)
      }
    }

    fileInput.click()
  })

export const prettyObject = (msg: any) => {
  let obj = ''
  if (typeof msg !== 'string') {
    obj = JSON.stringify(msg, null, '  ')
  }
  if (obj === '{}') {
    return obj.toString()
  }
  if (obj.startsWith('```json')) {
    return obj
  }
  return ['```json', obj, '```'].join('\n')
}
