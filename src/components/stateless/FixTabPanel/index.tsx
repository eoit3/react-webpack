import React, { PropsWithChildren } from 'react'

const FixTabPanel = ({ children }: PropsWithChildren) => (
  <div style={{ width: '100%', minHeight: 'calc(100vh - 232px)' }}>{children}</div>
)

export default FixTabPanel
