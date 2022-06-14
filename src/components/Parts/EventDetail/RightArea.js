import { useEffect, useState } from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ja'
import axios from '@/lib/axios'
import Link from 'next/link'

//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
//icons
import EmailIcon from '@mui/icons-material/Email';
const RightAreaWrapper = styled(Grid)`
@media screen and (min-width:1024px) {
  width: 300px;
}
  margin-top: 1rem;
  @media screen and (min-width:1024px) {
    position: fixed;
    left: 70%;
  }
`
const RightAreaPaper = styled(Paper)`
@media screen and (min-width:1024px) {
  width: 320px;
}
  padding: 1rem;
`
const EventDateTypo = styled(Typography)`
  text-align: center;
  margin-bottom: 1rem;
`
const StyledLoadingButton = styled(LoadingButton)`
@media screen and (min-width:1024px) {
  width: 300px;
  height: 50px;
  margin: 0 auto;
  display: block;
}
@media screen and (max-width:767px) {
  display: none;
}
`
const Recruitment = styled(Typography)`
  font-size: 0.8rem;
  text-align: center;
  margin-top: 1rem;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 1rem;
`
const Venue = styled(Typography)`
  font-size: 0.8rem;
  text-align: center;
  margin-top: 1rem;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 1rem;
`
const Contact = styled(Typography)`
  font-size: 0.8rem;
  text-align: center;
  margin-top: 1rem;
  padding-bottom: 1rem;
`
const RightArea = (props) => {
  const { eventInfo } = props
  const [loading, setLoading] = useState(false)
  const [recruitEnd, setRecruitEnd] = useState(null)
  const [recruitStart, setRecruitStart] = useState(null)
  useEffect(() => {
    setRecruitEnd(moment(new Date(eventInfo.recruit_end)).format('YYYY-MM-DD-HH:mm'))
    setRecruitStart(moment(new Date(eventInfo.recruit_start)).format('YYYY-MM-DD-HH:mm'))
  }, [eventInfo])
  eventInfo.eventDate = moment(new Date(eventInfo.event_start)).format('YYYY-MM-DD(ddd)')
  eventInfo.eventStartTime = moment(new Date(eventInfo.event_start)).format('HH:mm')
  eventInfo.eventEndTime = moment(new Date(eventInfo.event_end)).format('HH:mm')
  return (
    <RightAreaWrapper>
      <RightAreaPaper>
        <EventDateTypo>
          <strong>{eventInfo.eventDate}</strong><br />{eventInfo.eventStartTime} ~ {eventInfo.eventEndTime}
        </EventDateTypo>
        <StyledLoadingButton
          loading={loading}
          loadingPosition="start"
          variant="contained"
        >
          イベントに申し込む
        </StyledLoadingButton>
        <Recruitment>&#12304;募集期間&#12305;<br />{recruitStart} ~ {recruitEnd}</Recruitment>
        <Venue>会場 : {eventInfo.address}{eventInfo.other_address}</Venue>
        <Venue>参加者 : <strong>100人</strong> / 150人</Venue>
        <Contact>
          <Link href="#">
            <a><EmailIcon style={{ verticalAlign: 'middle' }} />イベントに関するお問合せ</a>
          </Link>
        </Contact>
      </RightAreaPaper>
    </RightAreaWrapper>
  )
}
export default RightArea