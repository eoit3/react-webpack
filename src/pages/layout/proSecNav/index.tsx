import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { SelectInfo } from 'rc-menu/es/interface'
import { useNavigate, useLocation } from 'react-router-dom'

import {
  HomeOutlined,
  DeploymentUnitOutlined,
  HeatMapOutlined,
  ApartmentOutlined,
  QuestionCircleOutlined,
  FireOutlined,
  GlobalOutlined,
  QrcodeOutlined
} from '@ant-design/icons'

import styles from './index.module.less'

const pathSubmenu: Record<string, string[]> = {
  '/home': ['home'],
  '/coupons/add': ['/sub-act', '/sub-coupons'],
  '/coupons/edit': ['/sub-act', '/sub-coupons'],
  '/product': ['/sub-act', '/sub-coupons']
}

const ProSecNav = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const redirectTo = (path: string) => {
    navigate(path)
  }

  // const { t } = useTranslation()
  const [selectedKeys, setSelectedKeys] = useState(['home'])

  // 当前路由对应的 sub menu key
  const [openKeys, setOpenKeys] = useState(['home'])

  // 提取放在redux中, tab 切换时改成 false
  const [isOpenChange, setIsOpenChange] = useState(false)

  // NOT READY FOR PRIME TIME
  // submenu keys of first level
  const [rootSubmenuKeys] = useState(['/sub-act', '/sub-list', '/sub-error'])

  useEffect(() => {
    const selectedPathKey = pathname
    setSelectedKeys([selectedPathKey])
    setOpenKeys(isOpenChange ? openKeys : pathSubmenu[pathname] ?? openKeys)
  }, [pathname, openKeys, isOpenChange])

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    setIsOpenChange(true)
    if (rootSubmenuKeys.indexOf(latestOpenKey as string) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const onSelect = ({ key }: SelectInfo) => {
    redirectTo(key)
    setIsOpenChange(false)
  }

  const menuItems = [
    { label: 'home', key: '/', icon: <HomeOutlined /> },
    { label: 'Parallax', key: '/parallax', icon: <FireOutlined /> },
    { label: 'QrGenerate', key: '/qrcode', icon: <QrcodeOutlined /> },
    { label: 'Video', key: '/video', icon: <FireOutlined /> },
    { label: 'Echarts', key: '/echarts', icon: <FireOutlined /> },
    { label: 'Mermaid', key: '/mermaid', icon: <FireOutlined /> },
    {
      label: 'Error',
      key: '/sub-error',
      icon: <QuestionCircleOutlined />,
      children: [{ label: 'ErrorBoundary', key: '/error' }]
    }
  ]

  return (
    <Menu
      mode='inline'
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      theme='light'
      className={styles.menu}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      items={menuItems}
    />
  )
}

export default ProSecNav
