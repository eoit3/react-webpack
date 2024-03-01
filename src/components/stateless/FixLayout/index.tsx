import React, { PropsWithChildren } from 'react'

const FixLayout = ({ children }: PropsWithChildren) => (
  <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>{children}</div>
)

export default FixLayout
