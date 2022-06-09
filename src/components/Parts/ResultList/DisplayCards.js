import { useEffect, useState } from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ja'
//mui
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
//css
import Css from '../../../../styles/result_list.module.css'
const WrapperCard = styled(Card)`
  width: 85%;
  max-height: 240px;
  margin-bottom: 2rem;
  @media screen and (max-width:767px) {
    width: 100%;
  }
`
const EventDateArea = styled(Typography)`
  @media screen and (min-width:1024px) {
    padding-top 2rem;
    width: 30%;
  }
  text-align: center;
`
const EventDateTypo = styled(Typography)`
  font-weight: bold;
  font-size: 1.1rem;
  @media screen and (max-width:767px) {
    display: inline;
  }
`
const EventTitleTypo = styled(Typography)`
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  @media screen and (min-width:1024px) {
    -webkit-line-clamp: 3;
  }
`
const StyledCardContents = styled(CardContent)`
  @media screen and (min-width:1024px) {
    display: flex;
  }
`
const DisplayCards = (props) => {
  const { events } = props
  const router = useRouter()
  events.map((data, index) => {
    data.eventDate = moment(data.event_date).format('YYYY-MM-DD(ddd)')
    data.eventStartTime = moment(data.event_start).format('HH:mm')
    data.eventEndTime = moment(data.event_end).format('HH:mm')
  })
  const mypage = (data) => {
    router.push({
      pathname: `/user/${data.user.name}`,
    });
  }
  return (
    <>
      {events.map((data, index) => (
        <WrapperCard key={index}>
          <StyledCardContents>
            <EventDateArea variant='body1' gutterBottom>
              <EventDateTypo>{data.eventDate}</EventDateTypo>{data.eventStartTime} ~ {data.eventEndTime}
            </EventDateArea>
            <EventTitleTypo className="bold fs15rem" variant='body1'>
              <Link href={`/result/event?event=${data.id}`} style={{ color: 'red' }}>
                <a style={{ color: '#333' }}>{data.title}</a>
              </Link>
            </EventTitleTypo>
          </StyledCardContents>
          <CardActions className={Css.bottom_card_action}>
            <Button size="small" onClick={() => mypage(data)}>{data.user.name}</Button>
          </CardActions>
        </WrapperCard>
      ))}
    </>
  )
}
export default DisplayCards