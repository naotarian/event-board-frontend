import { useEffect, useState } from 'react'
import styled from 'styled-components'
//components
import Header from '../components/Parts/Template/Header'
import Bread from '../components/Parts/Template/Breadcrumbs'
import AssignmentTags from '../components/Parts/CreateEvent/AssignmentTags'
import Head from 'next/head'
import axios from '@/lib/axios'
//mui
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import jaLocale from 'date-fns/locale/ja'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
const WrapperBody = styled(Grid)`
  @media screen and (min-width: 767px) {
    min-width: 1220px;
  }
  padding-top: 20px;
  @media screen and (max-width: 767px) {
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
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const TitleField = styled(TextField)`
  width: 100%;
  @media screen and (min-width: 767px) {
    width: 500px;
  }
`
const SubItem = styled(Typography)`
  border-bottom: 3px solid #0f22d3;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media screen and (min-width: 767px) {
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
  @media screen and (min-width: 767px) {
    width: 600px;
  }
`
const PcFlex = styled(Grid)`
  display: flex;
  @media screen and (max-width: 767px) {
    display: block;
  }
`
const PcFlexItem = styled(Grid)`
  margin-right: 2rem;
  width: 45%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const PlaceGrid = styled(Grid)`
  margin-bottom: 2rem;
`
const StyledTimePicker = styled(TimePicker)`
  @media screen and (max-width: 767px) {
    margin-bottom: 2rem;
    width: 150px;
  }
`
const SendButton = styled(LoadingButton)`
  width: 200px;
`
const ButtonArea = styled(Grid)`
  text-align: center;
  margin-top: 2rem;
`
const StyledInput = styled(TextField)`
  width: 300px;
`
const SuccessAlert = styled(Alert)`
  margin-top: 2rem;
`
const CreateEvent = () => {
  let dt = new Date()
  let ts = dt.getTime()
  let ts_after = ts + 1000 * 60 * 60 * 1
  const [zipCode, setZipCode] = useState('')
  const [rangeStartValue, setRangeStartValue] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [sendFlag, setSendFlag] = useState(true)
  const [sendObj, setSendObj] = useState({
    'eventTitle': '',
    'eventDate': '',
    'zipCode': '',
    'address': '',
    'otherAddress': '',
    'startTime': '',
    'endTime': '',
    'rangeStartValue': '',
    'rangeEndValue': '',
    'numberOfApplicants': 0,
    'overview': '',
    'eventTheme': '',
    'email': '',
    'recommendation': '',
    'notes': ''
  })
  //errorflag用
  const [eventTitleError, setEventTitleError] = useState(false)
  const [eventDateError, setEventDateError] = useState(false)
  const [zipCodeError, setZipCodeError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [startTimeError, setStartTimeError] = useState(false)
  const [endTimeError, setEndTimeError] = useState(false)
  const [numberOfApplicantsError, setNumberOfApplicantsError] = useState(false)
  //modal
  const [open, setOpen] = useState(false)
  const [tagAll, setTagAll] = useState(null)
  const [checkedTags, setCheckedTags] = useState([])
  useEffect(() => {
    if (zipCode) {
      fetch(`https://api.zipaddress.net/?zipcode=${zipCode}`, {
        mode: 'cors',
      })
        .then(result => {
          return result.json()
        })
        .then(result => {
          setSendObj({ ...sendObj, address: result.data?.fullAddress || '' })
        })
    }
  }, [zipCode])
  useEffect(async () => {
    axios
      .get('/api/get_tags')
      .then(res => {
        setTagAll(res.data.contents.tags)
      })
  }, [])
  const send = async () => {
    if (!sendFlag) return
    sendObj.event_tags = checkedTags
    const res = await axios.post('/api/create_event', sendObj).catch(error => {
      if (error.response.status != 422) throw error
    })
    if (res.data.code == 200) {
      setSuccess(true)
      setLoading(false)
    }
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const onChangeTitle = (e) => {
    setSendObj({ ...sendObj, eventTitle: e.target.value })
    e.target.value.length == 0 ? setEventTitleError(true) : setEventTitleError(false)
  }
  const onChangeEventDate = (newValue) => {
    const NewEventDate = newValue.getFullYear() + '/' +
      ('00' + (newValue.getMonth() + 1)).slice(-2) + '/' +
      ('00' + newValue.getDate()).slice(-2)
    setSendObj({ ...sendObj, eventDate: NewEventDate })
  }
  const onChangeZipCode = (e) => {
    setZipCode(e.target.value)
    setSendObj({ ...sendObj, zipCode: e.target.value })
    e.target.value.length == 0 ? setZipCodeError(true) : setZipCodeError(false)
    e.target.value.length == 0 ? setSendFlag(false) : setSendFlag(true)
  }
  const onChangeAdress = (e) => {
    // setSendObj({ ...sendObj, address: e.target.value })
    e.target.value.length == 0 ? setAddressError(true) : setAddressError(false)
    e.target.value.length == 0 ? setSendFlag(false) : setSendFlag(true)
  }
  const onChangeOtherAddress = (e) => {
    setSendObj({ ...sendObj, otherAddress: e.target.value })
  }
  const onChangeEndTime = (newValue) => {
    const NewEndTime = newValue.getFullYear() +
      '/' +
      ('00' + (newValue.getMonth() + 1)).slice(-2) +
      '/' +
      ('00' + newValue.getDate()).slice(-2) +
      ' ' +
      ('00' + newValue.getHours()).slice(-2) +
      ':' +
      ('00' + newValue.getMinutes()).slice(-2)
    setSendObj({ ...sendObj, endTime: NewEndTime })
  }
  const onChangeStartTime = (newValue) => {
    const NewStartTime = newValue.getFullYear() +
      '/' +
      ('00' + (newValue.getMonth() + 1)).slice(-2) +
      '/' +
      ('00' + newValue.getDate()).slice(-2) +
      ' ' +
      ('00' + newValue.getHours()).slice(-2) +
      ':' +
      ('00' + newValue.getMinutes()).slice(-2)
    setSendObj({ ...sendObj, startTime: NewStartTime })
  }
  const onChangeRangeStartValue = (newValue) => {
    const NewStartRange = newValue.getFullYear() +
      '/' +
      ('00' + (newValue.getMonth() + 1)).slice(-2) +
      '/' +
      ('00' + newValue.getDate()).slice(-2) +
      ' ' +
      ('00' + newValue.getHours()).slice(-2) +
      ':' +
      ('00' + newValue.getMinutes()).slice(-2)
    setSendObj({ ...sendObj, rangeStartValue: NewStartRange })
  }
  const onChangeRangeEndValue = (newValue) => {
    const NewEndRange = newValue.getFullYear() +
      '/' +
      ('00' + (newValue.getMonth() + 1)).slice(-2) +
      '/' +
      ('00' + newValue.getDate()).slice(-2) +
      ' ' +
      ('00' + newValue.getHours()).slice(-2) +
      ':' +
      ('00' + newValue.getMinutes()).slice(-2)
    setSendObj({ ...sendObj, rangeEndValue: NewEndRange })
  }
  const onChangeNumberOfApplicants = (e) => {
    setSendObj({ ...sendObj, numberOfApplicants: e.target.value })
  }
  const onChangeOverview = (e) => {
    setSendObj({ ...sendObj, overview: e.target.value })
  }
  const onChangeEventTheme = (e) => {
    setSendObj({ ...sendObj, eventTheme: e.target.value })
  }
  const onChangeEmail = (e) => {
    setSendObj({ ...sendObj, email: e.target.value })
  }
  const onChangeRecommendation = (e) => {
    setSendObj({ ...sendObj, recommendation: e.target.value })
  }
  const onChangeNotes = (e) => {
    setSendObj({ ...sendObj, notes: e.target.value })
  }

  return (
    <>
      <Head>
        <title>イベント作成</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />
      <WrapperBody>
        <WrapperBodyBg>
          <MainArea>
            <Bread />
            <Typography variant="h1" gutterBottom>
              イベントを作成
            </Typography>
            <SubItem variant="h2">イベントタイトル</SubItem>
            <TitleField
              id="event_title"
              label="イベントのタイトル"
              placeholder="イベントのタイトルを入力"
              multiline
              required
              error={eventTitleError}
              value={sendObj.eventTitle}
              onChange={onChangeTitle}
            />
            <PcFlex>
              <PcFlexItem>
                <SubItem variant="h2">開催日</SubItem>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={jaLocale}>
                  <DatePicker
                    label="開催日設定"
                    value={sendObj.eventDate}
                    onChange={onChangeEventDate}
                    inputFormat="yyyy年MM月dd日"
                    mask="____年__月__日"
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </PcFlexItem>
              <PcFlexItem>
                <SubItem variant="h2">開催場所</SubItem>
                <PlaceGrid>
                  <TextField
                    id="zipcode"
                    label="郵便番号"
                    variant="outlined"
                    placeholder="XXX-XXXX"
                    value={sendObj.zipCode}
                    onChange={onChangeZipCode}
                    error={zipCodeError}
                  />
                </PlaceGrid>
                <PlaceGrid>
                  <TextField
                    id="address"
                    label="住所"
                    variant="outlined"
                    value={sendObj.address}
                    onChange={onChangeAdress}
                    error={addressError}
                    fullWidth
                  />
                </PlaceGrid>
                <PlaceGrid>
                  <TextField
                    label="以下住所"
                    variant="outlined"
                    value={sendObj.otherAddress}
                    onChange={onChangeOtherAddress}
                    fullWidth
                  />
                </PlaceGrid>
              </PcFlexItem>
            </PcFlex>

            <SubItem variant="h2">開始、終了時間</SubItem>
            <TimerGrid>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={jaLocale}>
                <DateTimePicker
                  renderInput={props => <TextField {...props} />}
                  label="開始時間"
                  value={sendObj.startTime}
                  onChange={onChangeStartTime}
                  ampm={false}
                  inputFormat="yyyy年MM月dd日 HH時mm分"
                  mask="____年__月__日 __時__分"
                  fullWidth
                  error={startTimeError}
                />
              </LocalizationProvider>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={jaLocale}>
                <DateTimePicker
                  renderInput={props => <TextField {...props} />}
                  label="終了時間"
                  value={sendObj.endTime}
                  onChange={onChangeEndTime}
                  ampm={false}
                  inputFormat="yyyy年MM月dd日 HH時mm分"
                  mask="____年__月__日 __時__分"
                  minDateTime={rangeStartValue}
                  error={endTimeError}
                />
              </LocalizationProvider>
            </TimerGrid>
            <SubItem variant="h2">募集期間</SubItem>
            <TimerGrid>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={jaLocale}>
                <DateTimePicker
                  renderInput={props => <TextField {...props} />}
                  label="募集開始"
                  value={sendObj.rangeStartValue}
                  onChange={onChangeRangeStartValue}
                  ampm={false}
                  inputFormat="yyyy年MM月dd日 HH時mm分"
                  mask="____年__月__日 __時__分"
                  fullWidth
                />
              </LocalizationProvider>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={jaLocale}>
                <DateTimePicker
                  renderInput={props => <TextField {...props} />}
                  label="募集終了"
                  value={sendObj.rangeEndValue}
                  onChange={onChangeRangeEndValue}
                  ampm={false}
                  inputFormat="yyyy年MM月dd日 HH時mm分"
                  mask="____年__月__日 __時__分"
                  minDateTime={sendObj.rangeStartValue}
                />
              </LocalizationProvider>
            </TimerGrid>
            <SubItem variant="h2">募集人数</SubItem>
            <TextField
              id="outlined-number"
              label="募集人数(名)"
              type="number"
              value={sendObj.numberOfApplicants}
              InputLabelProps={{
                shrink: true,
              }}
              error={numberOfApplicantsError}
              onChange={onChangeNumberOfApplicants}
            />
            <SubItem variant="h2">概要</SubItem>
            <TextArea
              label="概要"
              multiline
              rows={8}
              placeholder="イベントの概要を記入"
              value={sendObj.overview}
              onChange={onChangeOverview}
            />
            <SubItem variant="h2">テーマ</SubItem>
            <TextArea
              label="テーマ"
              multiline
              rows={4}
              value={sendObj.eventTheme}
              onChange={onChangeEventTheme}
              placeholder="イベントのテーマを記入"
            />
            <SubItem variant="h2">イベントのタグ設定</SubItem>
            {tagAll && (
              <AssignmentTags
                open={open}
                setOpen={setOpen}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                tagAll={tagAll}
                checkedTags={checkedTags}
                setCheckedTags={setCheckedTags}
              />
            )}
            <SubItem variant="h2">お問い合わせ用メールアドレス</SubItem>
            <StyledInput
              label="お問い合わせ用メールアドレス"
              placeholder="test@test.com"
              required
              value={sendObj.email}
              onChange={onChangeEmail}
              error={emailError}
            />
            <SubItem variant="h2">こんな方におすすめ</SubItem>
            <TextArea
              label="こんな方におすすめ"
              multiline
              rows={4}
              placeholder="・技術検証組織に興味がある&#13;&#10;・SaaS開発に携わるエンジニアの話が聞きたい"
              value={sendObj.recommendation}
              onChange={onChangeRecommendation}
            />
            <SubItem variant="h2">注意事項</SubItem>
            <TextArea
              label="注意事項"
              multiline
              rows={4}
              placeholder="・当イベントの内容およびスケジュールは、予告なく変更となる場合があります。予めご了承ください。&#13;&#10;
              ・他の参加者の方の妨げになるような行為は禁止、運営側の判断でご退出をお願いする場合があります。&#13;&#10;
              ・ブログやSNS等で当イベントに関する発信を行う際は、公序良俗に反する内容のないよう、ご協力をお願いします。"
              value={sendObj.notes}
              onChange={onChangeNotes}
            />
            {success && (
              <SuccessAlert
                onClose={() => {
                  setSuccess(false)
                }}
                variant="filled"
                severity="success">
                新規イベントを作成しました。
              </SuccessAlert>
            )}
            <ButtonArea>
              <SendButton loading={loading} variant="contained" onClick={send}>
                この内容で作成
              </SendButton>
            </ButtonArea>
          </MainArea>
        </WrapperBodyBg>
      </WrapperBody>
    </>
  )
}
export default CreateEvent
