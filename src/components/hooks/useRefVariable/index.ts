import { useRef } from 'react'

const useRefVariable = (value: any) => {
  const ref = useRef()
  ref.current = value
  return ref
}

export default useRefVariable
