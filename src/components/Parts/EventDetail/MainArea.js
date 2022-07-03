import { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'moment/locale/ja'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
//components
import DetailTags from './DetailTags'
import EventContent from './EventContent'
const MainPaper = styled(Paper)`
  @media screen and (min-width: 1024px) {
    width: 800px;
  }
  margin-top: 1rem;
`
const MainWrapper = styled(Grid)`
  padding: 1rem 2rem;
`
const Baner = styled(Typography)`
  background-color: #3f50b5;
  color: #fff;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 5px;
`
const StyledAlert = styled(Alert)`
  margin-bottom: 2rem;
`
const MainArea = props => {
  const { eventInfo, applicationMessage, setApplicationMessage } = props
  return (
    <MainPaper elevation={0}>
      {eventInfo && (
        <>
          {applicationMessage && (
            <StyledAlert
              variant="filled"
              severity="success"
              onClose={() => setApplicationMessage('')}>
              {applicationMessage}
              <br />
              確認メールを送信しました。
            </StyledAlert>
          )}
          <img
            src="/images/test.jpeg"
            alt="logo"
            width="800"
            style={{ maxWidth: '100%' }}
          />
          <MainWrapper>
            <Typography variant="h2" gutterBottom>
              {eventInfo.title}
            </Typography>
            <DetailTags eventInfo={eventInfo} />
            <Baner>イベント内容</Baner>
            <EventContent eventInfo={eventInfo} />
          </MainWrapper>
        </>
      )}
    </MainPaper>
  )
}
export default MainArea
