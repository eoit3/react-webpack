import React, { PropsWithChildren } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { SpinProps } from 'antd/es/spin'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Loading = (props: SpinProps) => <Spin indicator={antIcon} {...props} />

export default Loading
