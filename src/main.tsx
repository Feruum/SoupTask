import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import '@fontsource-variable/inter'
import '@fontsource-variable/geist'
import '@/components/arc/foundation.css'
import 'uplot/dist/uPlot.min.css'
import '@/styles/theme.css'
import '@/styles/mobile.css'
import { App } from '@/app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter><App /></BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)
