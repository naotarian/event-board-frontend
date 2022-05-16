import { createTheme } from '@material-ui/core'
const fontFamily = [
  'Yu Gothic',
  'Hiragino Sans',
  'Hiragino Kaku Gothic ProN',
  'メイリオ',
  // 使用したいフォントを以降に羅列してください
].join(',');
const theme = createTheme({
  typography: {
    fontFamily: fontFamily,  // フォント
  },
  palette: {
    // Primaryカラーを設定
    primary: {
      light: '#54C527',
      main: '#ff9800',
      dark: '#b26a00',
      contrastText: '#000000',
      mainGradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    // Secondaryカラーを設定
    secondary: {
      light: '#33eb91',
      main: '#00e676',
      dark: '#00a152',
      contrastText: '#ffffff',
    },
    type: 'dark', // ダークモードをON
  },
  mixins: {
    // ツールバーの高さ
    toolbar: {
      minHeight: 64,
    },
  },
  // 各パーツのスタイルをカスタマイズ
  props: {
    MuiCheckbox: {
      color: 'primary',
    },
    MuiList: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiTextField: {
      variant: 'outlined',
    },
  },
});

export default theme
