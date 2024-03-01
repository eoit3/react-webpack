import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeIndex from './theme'
import { ProThemeProvider } from './theme/hooks'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  <ProThemeProvider>
    <ThemeIndex />
  </ProThemeProvider>
)
