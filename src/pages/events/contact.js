import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
//components
import Header from '../../components/Parts/Template/Header'
import Bread from '../../components/Parts/Template/Breadcrumbs'

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

const FromWrapper = styled(Grid)`
  padding: 1rem;
`

const Contact = () => {
  const router = useRouter()
  const [eventInfo, setEventInfo] = useState(null)
  const eventId = router.query.event
  const { user } = useAuth({ middleware: 'guest' })
  useEffect(() => {
    ; (async () => {
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
            <FromWrapper>
              <Typography variant="h2">イベント名</Typography>
              <Typography>{eventInfo.title}</Typography>
              <Typography variant="h2">イベント開催日時</Typography>
              <Typography>{eventInfo.event_start} ~ {eventInfo.event_end}</Typography>
              <Typography variant="h2">開催場所</Typography>
              <Typography>&#12306;{eventInfo.post_code}&nbsp;{eventInfo.address}{eventInfo.other_address}</Typography>
            </FromWrapper>
          )}
        </ContentWrapper>
      </WrapperGrid>
    </>
  )
}
export default Contact