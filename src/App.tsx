import React, { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Watermark from '@stateless/Watermark'
import rootRouter from './routers'
import AuthRouter from './routers/authRouter'
import { sentryInit } from './utils'

const App = () => {
  const [loading, setLoading] = useState(true)
  const asyncCall = () => new Promise<void>(resolve => setTimeout(() => resolve(), 500))
  useEffect(() => {
    sentryInit()
    asyncCall()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
    Watermark({
      content: 'React-webpack', // 水印文本
      container: document.getElementById('root') as HTMLElement // 水印容器区域
    })
  }, [])

  useEffect(() => {}, [])

  const element = useRoutes(rootRouter as any)

  if (loading) return null
  return (
    <>
      <AuthRouter>{element}</AuthRouter>
    </>
  )
}

export default App
