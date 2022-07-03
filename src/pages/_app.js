import '../../styles/global/global.css'
import theme from '../components/default'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <style global jsx>
        {`
          html {
          }
          img {
          }
        `}
      </style>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
