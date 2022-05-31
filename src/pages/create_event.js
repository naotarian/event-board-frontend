import { useEffect, useState } from 'react'
import styled from "styled-components"
//components
import Header from '../components/Parts/Template/Header'
import Bread from '../components/Parts/Template/Breadcrumbs'
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
const WrapperBody = styled(Grid)`
  min-width: 1220px;
  padding-top: 20px;
`
const WrapperBodyBg = styled(Grid)`
  margin-bottom: -30px;
  background-color: #f4f5f8;
`
const MainArea = styled(Grid)`
  width: 1220px;
  margin: 0 auto;
  padding: 40px 10px;
`
const TitleField = styled(TextField)`
  width: 500px;
`
const SubItem = styled(Typography)`
  border-bottom: 3px solid #0f22d3;
  max-width: 500px;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
const TextArea = styled(TextField)`
  width: 100%;
`
const TimerGrid = styled(Grid)`
  display: flex;
  width: 600px;
  justify-content: space-between;
  margin-bottom: 2rem;
`
const CreateEvent = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <>
      <Header />
      <WrapperBody>
        <WrapperBodyBg>
          <MainArea>
            <Bread />
            <Typography variant="h1" gutterBottom>
              イベントを作成
            </Typography>
            <TitleField
              id="event_title"
              label="イベントのタイトル"
              placeholder="イベントのタイトルを入力"
              multiline
            />
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
              タイムスケジュール
            </SubItem>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={jaLocale}
            >
              <TimerGrid>
                <TimePicker
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  ampm={false}
                  label="開始時間"
                />
                <TimePicker
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  ampm={false}
                  label="終了時間"
                />
              </TimerGrid>
              <TextArea
                label="内容"
                multiline
                rows={4}
                placeholder="指定した時間帯に行う内容を記載"
              />
            </LocalizationProvider>
          </MainArea>
        </WrapperBodyBg>
      </WrapperBody>
    </>
  )
}
export default CreateEvent