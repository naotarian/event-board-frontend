import { useEffect, useState } from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ja'
import axios from '@/lib/axios'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Link from 'next/link'
//components
import Header from '../../components/Parts/Template/Header'
import Bread from '../../components/Parts/Template/Breadcrumbs'
import MainArea from '../../components/Parts/EventDetail/MainArea'
import RightArea from '../../components/Parts/EventDetail/RightArea'

const WrapperGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
`
const ContentWrapper = styled(Grid)`
  display: flex;
  justify-content: space-between;
`
const Event = (props) => {
  const router = useRouter()
  const [eventInfo, setEventInfo] = useState(null)
  let eventId = router.query.event
  useEffect(async () => {
    if (router.isReady) {
      let sendData = {}
      sendData.id = eventId
      axios.post('/api/event_detail', sendData)
        .then(res => {
          setEventInfo(res.data.contents.event_info)
        }).catch(error => {

        })

    }

  }, [eventId])
  return (
    <>
      <Header />
      <WrapperGrid>
        <Bread />
        <ContentWrapper>
          <MainArea eventInfo={eventInfo} />
          <RightArea eventInfo={eventInfo} />
        </ContentWrapper>
      </WrapperGrid>
    </>
  )
}
export default Event