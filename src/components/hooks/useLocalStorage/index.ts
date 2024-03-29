import { useState, useEffect } from 'react'

function getStorageValue(key: string, defaultValue = '') {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key)
    return saved !== null ? JSON.parse(saved) : defaultValue
  }
}

const useLocalStorage = (key: string, defaultValue = '') => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
export default useLocalStorage
