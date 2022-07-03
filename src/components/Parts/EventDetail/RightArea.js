import { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/ja'
import axios from '@/lib/axios'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
//icons
import EmailIcon from '@mui/icons-material/Email'
//components
import GuestModal from './GuestModal'
const RightAreaWrapper = styled(Grid)`
  @media screen and (min-width: 1024px) {
    width: 300px;
  }
  margin-top: 1rem;
  @media screen and (min-width: 1024px) {
    position: fixed;
    left: 70%;
  }
`
const RightAreaPaper = styled(Paper)`
  @media screen and (min-width: 1024px) {
    width: 320px;
  }
  padding: 1rem;
`
const EventDateTypo = styled(Typography)`
  text-align: center;
  margin-bottom: 1rem;
`
const StyledLoadingButton = styled(LoadingButton)`
  width: 300px;
  height: 50px;
  margin: 0 auto;
  display: block;
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
const RightArea = props => {
  const { eventInfo, applicationMessage, setApplicationMessage } = props
  const { user } = useAuth({ middleware: 'guest' })
  const [loading, setLoading] = useState(false)
  const [recruitEnd, setRecruitEnd] = useState(null)
  const [recruitStart, setRecruitStart] = useState(null)
  const [applicationDisabled, setApplicationDisabled] = useState(false)
  const [guestModalOpen, setGuestModalOpen] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [applicationButtonDisabled, setApplicationButtonDisabled] = useState(
    false,
  )
  useEffect(() => {
    setRecruitEnd(
      moment(new Date(eventInfo.recruit_end)).format('YYYY-MM-DD-HH:mm'),
    )
    setRecruitStart(
      moment(new Date(eventInfo.recruit_start)).format('YYYY-MM-DD-HH:mm'),
    )
    if (!user) return
    setApplicationDisabled(user.id === eventInfo.user_id)
  }, [eventInfo])
  eventInfo.eventDate = moment(new Date(eventInfo.event_start)).format(
    'YYYY-MM-DD(ddd)',
  )
  eventInfo.eventStartTime = moment(new Date(eventInfo.event_start)).format(
    'HH:mm',
  )
  eventInfo.eventEndTime = moment(new Date(eventInfo.event_end)).format('HH:mm')
  const eventApplication = async () => {
    let sendData = { eventId: eventInfo.id, guestFlag: false }
    const res = await axios.post('/api/event_application', sendData)
    setApplicationMessage(res.data.msg)
    setGuestModalOpen(false)
  }
  const guestModalClose = () => {
    setGuestModalOpen(false)
  }
  const guestApplication = async () => {
    setApplicationButtonDisabled(true)
    const sendData = {
      userId: -1,
      eventId: eventInfo.id,
      userName: guestName,
      email: guestEmail,
      guestFlag: true
    }
    const res = await axios.post('/api/event_application', sendData)
    setApplicationMessage(res.data.msg)
    setGuestModalOpen(false)
  }
  const clickGuestModal = () => {
    setGuestModalOpen(true)
  }
  const applicationButton = (user, ids, id) => {
    if (user) {
      if (ids.includes(id)) {
        return (
          <StyledLoadingButton
            loadingPosition="start"
            variant="contained"
            disabled="true">
            申し込み済みです
          </StyledLoadingButton>
        )
      } else {
        return (
          <StyledLoadingButton
            loading={loading}
            loadingPosition="start"
            variant="contained"
            disabled={applicationDisabled}
            onClick={eventApplication}>
            イベントに申し込む
          </StyledLoadingButton>
        )
      }
    } else {
      return (
        <StyledLoadingButton
          loading={loading}
          loadingPosition="start"
          variant="contained"
          disabled={applicationDisabled}
          onClick={clickGuestModal}>
          イベントに申し込む
        </StyledLoadingButton>
      )
    }
  }
  return (
    <RightAreaWrapper>
      <RightAreaPaper>
        <EventDateTypo>
          <strong>{eventInfo.eventDate}</strong>
          <br />
          {eventInfo.eventStartTime} ~ {eventInfo.eventEndTime}
        </EventDateTypo>
        {applicationButton(user, eventInfo.already_applications, eventInfo.id)}
        <Recruitment>
          &#12304;募集期間&#12305;
          <br />
          {recruitStart} ~ {recruitEnd}
        </Recruitment>
        <Venue>
          会場 : {eventInfo.address}
          {eventInfo.other_address}
        </Venue>
        <Venue>
          参加者 :
          <strong>
            {eventInfo.event_crowd_management.current_number_of_applicants}人
          </strong>
          / {eventInfo.event_crowd_management.number_of_applicants}人
        </Venue>
        {!applicationDisabled && (
          <Contact>
            <Link href="#">
              <a>
                <EmailIcon style={{ verticalAlign: 'middle' }} />
                イベントに関するお問合せ
              </a>
            </Link>
          </Contact>
        )}
      </RightAreaPaper>
      <GuestModal
        guestModalOpen={guestModalOpen}
        guestModalClose={guestModalClose}
        guestApplication={guestApplication}
        setGuestName={setGuestName}
        setGuestEmail={setGuestEmail}
        applicationButtonDisabled={applicationButtonDisabled}
        applicationMessage={applicationMessage}
      />
    </RightAreaWrapper>
  )
}
export default RightArea
