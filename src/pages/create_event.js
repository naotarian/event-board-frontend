import { useEffect, useState } from 'react'
import styled from "styled-components"
//components
import Header from '../components/Parts/Template/Header'
import Bread from '../components/Parts/Template/Breadcrumbs'
import Head from 'next/head'
//mui
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import jaLocale from 'date-fns/locale/ja'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
const WrapperBody = styled(Grid)`
@media screen and (min-width:767px) {
  min-width: 1220px;
}
  padding-top: 20px;
  @media screen and (max-width:767px) {
    width: 100%;
  }
`
const WrapperBodyBg = styled(Grid)`
  margin-bottom: -30px;
  background-color: #f4f5f8;
`
const MainArea = styled(Grid)`
width: 1220px;
margin: 0 auto;
padding: 40px 10px;
@media screen and (max-width:767px) {
  width: 100%;
}
`
const TitleField = styled(TextField)`
  width: 100%;
  @media screen and (min-width:767px) {
    width: 500px;
  }
`
const SubItem = styled(Typography)`
  border-bottom: 3px solid #0f22d3;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media screen and (min-width:767px) {
    width: 500px;
  }
`
const TextArea = styled(TextField)`
  width: 100%;
`
const TimerGrid = styled(Grid)`
  margin-bottom: 2rem;
  justify-content: space-between;
  width: 100%;
  display: flex;
  @media screen and (min-width:767px) {
    width: 600px;
  }
`
const PcFlex = styled(Grid)`
  display: flex;
  @media screen and (max-width:767px) {
    display: block;
  }
`
const PcFlexItem = styled(Grid)`
  margin-right: 2rem;
  width: 45%;
  @media screen and (max-width:767px) {
    width: 100%;
  }
`
const PlaceGrid = styled(Grid)`
  margin-bottom: 2rem;
`
const StyledTimePicker = styled(TimePicker)`
  @media screen and (max-width:767px) {
    margin-bottom: 2rem;
    width: 150px;
  }
`
const CreateEvent = () => {
  const [startTime, setStartTime] = useState(new Date());
  let dt = new Date()
  let ts = dt.getTime()
  let ts_after = ts + (1000 * 60 * 60 * 1)
  const [endTime, setEndTime] = useState(new Date(ts_after))
  const [value, setValue] = useState(null)
  const [rangeValue, setRangeValue] = useState([null, null])
  const [zipCode, setZipCode] = useState('')
  const [address, setAddress] = useState('')
  const [rangeStartValue, setRangeStartValue] = useState(new Date())
  const [rangeEndValue, setRangeEndValue] = useState(new Date())
  useEffect(() => {
    if (zipCode) {
      fetch(`https://api.zipaddress.net/?zipcode=${zipCode}`, {
        mode: 'cors',
      })
        .then((result) => {
          return result.json();
        })
        .then((result) => {
          setAddress(result.data?.fullAddress || '');
        });
    }
  }, [zipCode]);

  return (
    <>
      <Head>
        <title>イベント作成</title>
        <meta name="viewport" content="width=device-width"></meta>
      </Head>
      <Header />
      <WrapperBody>
        <WrapperBodyBg>
          <MainArea>
            <Bread />
            <Typography variant="h1" gutterBottom>
              イベントを作成
            </Typography>
            <SubItem variant="h2">
              イベントタイトル
            </SubItem>
            <TitleField
              id="event_title"
              label="イベントのタイトル"
              placeholder="イベントのタイトルを入力"
              multiline
            />
            <PcFlex>
              <PcFlexItem>
                <SubItem variant="h2">
                  開催日
                </SubItem>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={jaLocale}>
                  <DatePicker
                    label="開催日設定"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    inputFormat='yyyy年MM月dd日'
                    mask='____年__月__日'
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </PcFlexItem>
              <PcFlexItem>
                <SubItem variant="h2">
                  開催場所
                </SubItem>
                <PlaceGrid>
                  <TextField
                    id="zipcode"
                    label="郵便番号"
                    variant="outlined"
                    placeholder="XXX-XXXX"
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                    }}
                  />
                </PlaceGrid>
                <PlaceGrid>
                  <TextField
                    id="address"
                    label="住所"
                    variant="outlined"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    fullWidth
                  />
                </PlaceGrid>
                <PlaceGrid>
                  <TextField
                    label="以下住所"
                    variant="outlined"
                    fullWidth
                  />
                </PlaceGrid>
              </PcFlexItem>
            </PcFlex>

            <SubItem variant="h2">
              開始、終了時間
            </SubItem>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={jaLocale}
            >
              <TimerGrid>
                <StyledTimePicker
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  ampm={false}
                  label="開始時間"
                />
                <StyledTimePicker
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  ampm={false}
                  label="終了時間"
                />
              </TimerGrid>
            </LocalizationProvider>
            <SubItem variant="h2">
              募集期間
            </SubItem>
            <TimerGrid>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={jaLocale}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="募集開始"
                  value={rangeStartValue}
                  onChange={(newValue) => {
                    setRangeStartValue(newValue);
                  }}
                  ampm={false}
                  inputFormat='yyyy年MM月dd日HH時MM分'
                />
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="募集終了"
                  value={rangeEndValue}
                  onChange={(newValue) => {
                    setRangeEndValue(newValue);
                  }}
                  ampm={false}
                  inputFormat='yyyy年MM月dd日HH時MM分'
                  minDateTime={rangeStartValue}
                />
              </LocalizationProvider>
            </TimerGrid>
            <SubItem variant="h2">
              概要
            </SubItem>
            <TextArea
              label="概要"
              multiline
              rows={8}
              placeholder="イベントの概要を記入"
            />
            <SubItem variant="h2">
              概要
            </SubItem>
            <TextArea
              label="テーマ"
              multiline
              rows={4}
              placeholder="イベントのテーマを記入"
            />
            <SubItem variant="h2">
              こんな方におすすめ
            </SubItem>
            <TextArea
              label="こんな方におすすめ"
              multiline
              rows={4}
              placeholder="・技術検証組織に興味がある&#13;&#10;・SaaS開発に携わるエンジニアの話が聞きたい"
            />
            <SubItem variant="h2">
              注意事項
            </SubItem>
            <TextArea
              label="注意事項"
              multiline
              rows={4}
              placeholder="・当イベントの内容およびスケジュールは、予告なく変更となる場合があります。予めご了承ください。&#13;&#10;
              ・他の参加者の方の妨げになるような行為は禁止、運営側の判断でご退出をお願いする場合があります。&#13;&#10;
              ・ブログやSNS等で当イベントに関する発信を行う際は、公序良俗に反する内容のないよう、ご協力をお願いします。"
            />
          </MainArea>
        </WrapperBodyBg>
      </WrapperBody>
    </>
  )
}
export default CreateEvent