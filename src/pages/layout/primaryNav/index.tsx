import React from 'react'
import { Button, Space } from 'antd'
import { CodeOutlined, TeamOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const PrimaryNav = () => {
  const navigate = useNavigate()
  const goToBaidu = () => {
    window.open(`https://www.baidu.com`, '_blank')
  }

  return (
    <>
      <Space>
        <Button type='link' icon={<TeamOutlined />} onClick={goToBaidu}>
          baidu.com
        </Button>
      </Space>
    </>
  )
}

export default PrimaryNav
