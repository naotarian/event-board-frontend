import 'tailwindcss/tailwind.css'
import '../../styles/global/global.css'
import theme from '../components/default'
import { ThemeProvider } from '@material-ui/styles'
// const App = ({ Component, pageProps }) => <Component {...pageProps} />
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
