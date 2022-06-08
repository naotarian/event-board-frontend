import { useEffect, useState } from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ja'
import axios from '@/lib/axios'
//mui
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

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
      {eventInfo && (
        <>
          {eventInfo.title}
        </>
      )}
    </>
  )
}
export default Event