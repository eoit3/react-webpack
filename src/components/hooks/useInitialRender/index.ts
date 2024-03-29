import { useEffect, useRef } from 'react'
// https://github.com/kentcdodds/use-deep-compare-effect

const useInitialRender = () => {
  const ref = useRef<boolean>()
  useEffect(() => {
    ref.current = true
  }, [])
  return ref.current
}

export default useInitialRender
