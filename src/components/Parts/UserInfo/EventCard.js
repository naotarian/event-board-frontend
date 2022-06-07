import { useEffect, useState } from 'react'
import styled from "styled-components"
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ja'
//mui
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
//css
import Css from '../../../../styles/result_list.module.css'
const WrapperCard = styled(Card)`
  max-height: 240px;
  margin-bottom: 2rem;
`
const EventDateArea = styled(Typography)`
  padding-top 2rem;
  width: 30%;
  text-align: center;
`
const EventDateTypo = styled(Typography)`
  font-weight: bold;
  font-size: 1.1rem;
`
const EventTitleTypo = styled(Typography)`
  width: 100%;
`
const StyledCardContents = styled(CardContent)`
  position: relative;
  padding: 20px 0;
`
const Band = styled(Typography)`
  display: inline-block;
  position: absolute;
  left: 0;
  top: 5px;
  box-sizing: border-box;
  padding: 0 12px;
  margin: 0;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  letter-spacing: 0.1em;
  color: white;
  background: ${props => props.deadline == 'deadline' ? 'red' : '#70c7ff'};
  // background: #70c7ff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.12);
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: -7px;
    border: none;
    height: 38px;
    width: 7px;
    background: #70c7ff;
    border-radius: 5px 0 0 5px;
  }
  &::after {
    position: absolute;
    content: '';
    bottom: -7px;
    left: -5px;
    border: none;
    height: 7px;
    width: 5px;
    background: #4d99ca;
    border-radius: 5px 0 0 5px;
  }
`
const EventCards = (props) => {
  const { events } = props
  const router = useRouter()
  const now = moment()
  let deadline = true
  events.map((data, index) => {
    data.eventDate = moment(data.event_date).format('YYYY-MM-DD(ddd)')
    data.eventStartTime = moment(data.event_start).format('HH:mm')
    data.eventEndTime = moment(data.event_end).format('HH:mm')
    data.deadline = now.isAfter(moment(data.event_date)) ? 'deadline' : ''
    data.bandTxt = now.isAfter(moment(data.event_date)) ? '終了' : 'New'
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
          <StyledCardContents className="flex">
            <Band variant="h3" deadline={data.deadline}>{data.bandTxt}</Band>
            <EventDateArea variant='body1' gutterBottom>
              <EventDateTypo>{data.eventDate}</EventDateTypo>{data.eventStartTime} ~ {data.eventEndTime}
            </EventDateArea>
            <EventTitleTypo className="bold fs15rem" variant='body1'>
              {data.title}
            </EventTitleTypo>
          </StyledCardContents>
        </WrapperCard>
      ))}
    </>
  )
}
export default EventCards