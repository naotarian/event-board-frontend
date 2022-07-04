import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import 'moment/locale/ja'
import axios from '@/lib/axios'
//mui
import Grid from '@mui/material/Grid'
//components
import Header from '../../components/Parts/Template/Header'
import Bread from '../../components/Parts/Template/Breadcrumbs'
import MainArea from '../../components/Parts/EventDetail/MainArea'
import RightArea from '../../components/Parts/EventDetail/RightArea'
import { useAuth } from '@/hooks/auth'

const WrapperGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
`
const ContentWrapper = styled(Grid)`
  @media screen and (min-width: 1024px) {
    display: flex;
  }
  justify-content: space-between;
`
const Event = () => {
  const router = useRouter()
  const [eventInfo, setEventInfo] = useState(null)
  const [applicationMessage, setApplicationMessage] = useState('')
  const eventId = router.query.event
  const { user } = useAuth({ middleware: 'guest' })
  useEffect(() => {
    (async () => {
      if (!router.isReady) return
      const sendData = { id: eventId, isAuth: user ? 1 : 0 }
      const res = await axios.post('/api/event_detail', sendData)
      setEventInfo(res.data.contents.event_info)
    })()
  }, [router.isReady, user])
  return (
    <>
      <Header />
      <WrapperGrid>
        <Bread />
        <ContentWrapper>
          {eventInfo && (
            <MainArea
              eventInfo={eventInfo}
              applicationMessage={applicationMessage}
              setApplicationMessage={setApplicationMessage}
            />
          )}
          {eventInfo && (
            <RightArea
              eventInfo={eventInfo}
              applicationMessage={applicationMessage}
              setApplicationMessage={setApplicationMessage}
            />
          )}
        </ContentWrapper>
      </WrapperGrid>
    </>
  )
}
export default Event
