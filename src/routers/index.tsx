import React, { Suspense, lazy } from 'react'
import Loading from '@/components/stateless/Loading'
import { DataRouteObject } from 'react-router-dom'

const lazyLoad = (Component: React.ElementType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

const Home = lazy(() => import('@/pages/home'))
const Layout = lazy(() => import('@pages/layout'))
const SignIn = lazy(() => import('@pages/signin'))
const ParallaxVert = lazy(() => import('@pages/parallax'))
const Echarts = lazy(() => import('@pages/echarts'))
const Mermaid = lazy(() => import('@pages/mermaid'))
const Video = lazy(() => import('@pages/video'))
const QrCode = lazy(() => import('@pages/qrGenerate'))
const NoMatch = lazy(() => import('@stateless/NoMatch'))
const ErrorPage = lazy(() => import('@pages/error'))

export interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  index?: boolean
  path?: string
  auth?: boolean
  key?: string
  i18nKey?: string
  name: string
}

const rootRouter: RouteObject[] = [
  {
    path: '/',
    name: '首页',
    i18nKey: 'home',
    key: '/',
    auth: true,
    element: lazyLoad(Layout),
    children: [
      {
        index: true,
        name: '首页',
        key: '/',
        i18nKey: 'home',
        auth: true,
        element: lazyLoad(Home)
      },
      {
        index: false,
        path: 'parallax',
        name: 'Parallax',
        key: '/parallax',
        auth: true,
        element: lazyLoad(ParallaxVert)
      },
      {
        index: false,
        path: 'echarts',
        name: 'ReactEcharts',
        key: '/echarts',
        auth: true,
        element: lazyLoad(Echarts)
      },
      {
        index: false,
        path: 'qrcode',
        name: 'QrGenerate',
        key: '/qrcode',
        auth: false,
        element: lazyLoad(QrCode)
      },
      {
        index: false,
        path: 'video',
        name: 'React Video',
        key: '/video',
        auth: false,
        element: lazyLoad(Video)
      },
      {
        index: false,
        path: 'mermaid',
        name: 'Mermaid',
        key: '/mermaid',
        auth: false,
        element: lazyLoad(Mermaid)
      },
      {
        index: false,
        path: 'error',
        name: 'Error',
        key: '/error',
        auth: false,
        element: lazyLoad(ErrorPage)
      },
      {
        path: '*',
        name: 'No Match',
        key: '*',
        element: lazyLoad(NoMatch)
      }
    ]
  },
  {
    index: false,
    path: 'signin',
    name: '登录',
    key: '/signin',
    auth: false,
    element: lazyLoad(SignIn)
  },
  {
    path: '*',
    name: 'No Match',
    key: '*',
    element: lazyLoad(NoMatch)
  }
]

export default rootRouter
