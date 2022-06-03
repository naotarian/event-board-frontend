import '../../styles/global/global.css'
import theme from '../components/default'
import { ThemeProvider } from '@mui/material/styles';
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
