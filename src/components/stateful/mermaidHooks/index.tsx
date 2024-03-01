import React, { PropsWithChildren, useEffect } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'monospace'
})

interface MermaidHooksProps extends PropsWithChildren {
  chart: string
}

const MermaidHooks = ({ chart }: MermaidHooksProps) => {
  useEffect(() => {
    mermaid.contentLoaded()
  }, [])
  return (
    <div className='mermaid' style={{ minHeight: 0, background: '#fff' }}>
      {chart}
    </div>
  )
}

export default MermaidHooks
