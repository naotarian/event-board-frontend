import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      '"Yu Gothic"', 'YuGothic', '"Hiragino Sans"', '"Hiragino Kaku Gothic ProN"', 'Verdana', '"メイリオ"', 'Meiryo', 'sans-serif',


    ].join(','),
    body1: {
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },
});

export default theme
