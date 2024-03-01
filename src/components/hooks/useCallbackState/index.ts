import { useEffect, useRef, useState } from 'react'

const useCallbackState = (initialValue: any) => {
  const [state, _setState] = useState(initialValue)
  const callbackQueue = useRef<Function[]>([])
  useEffect(() => {
    callbackQueue.current.forEach(cb => cb(state))
    callbackQueue.current = []
  }, [state])
  const setState = (newValue: string, callback: Function) => {
    _setState(newValue)
    if (callback && typeof callback === 'function') {
      callbackQueue.current.push(callback)
    }
  }
  return [state, setState]
}
export default useCallbackState
