import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ja'
//mui
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
const WrapperCard = styled(Card)`
  max-height: 240px;
  margin-bottom: 2rem;
`
const EventDateArea = styled(Typography)`
  text-align: center;
  @media screen and (min-width:1024px) {
    padding-top 2rem;
    width: 30%;
  }
`
const EventDateTypo = styled(Typography)`
  font-weight: bold;
  font-size: 1.1rem;
`
const EventTitleTypo = styled(Typography)`
  @media screen and (min-width: 1024px) {
    width: 100%;
    padding-right: 2rem;
  }
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`
const StyledCardContents = styled(CardContent)`
  position: relative;
  padding: 20px 0;
  @media screen and (min-width: 1024px) {
    display: flex;
  }
  @media screen and (max-width: 767px) {
    padding: 1rem;
  }
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
  background: ${props => (props.deadline == 'deadline' ? 'red' : '#70c7ff')};
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
    background: ${props => (props.deadline == 'deadline' ? 'red' : '#70c7ff')};
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
    background: ${props => (props.deadline == 'deadline' ? 'red' : '#70c7ff')};
    border-radius: 5px 0 0 5px;
  }
`
const EventCards = props => {
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
  const CardDisplay = events.map((data, index) => {
    if (index < 3) {
      return (
        <WrapperCard key={index}>
          <StyledCardContents>
            <Band variant="h3" deadline={data.deadline}>
              {data.bandTxt}
            </Band>
            <EventDateArea variant="body1" gutterBottom>
              <EventDateTypo>{data.eventDate}</EventDateTypo>
              {data.eventStartTime} ~ {data.eventEndTime}
            </EventDateArea>
            <EventTitleTypo className="bold fs15rem" variant="body1">
              {data.title}
            </EventTitleTypo>
          </StyledCardContents>
        </WrapperCard>
      )
    }
  })
  const overCountCard = (
    events.map((data, index) => {
      if (index >= 3) {
        return (
          <WrapperCard key={index}>
            <StyledCardContents>
              <Band variant="h3" deadline={data.deadline}>
                {data.bandTxt}
              </Band>
              <EventDateArea variant="body1" gutterBottom>
                <EventDateTypo>{data.eventDate}</EventDateTypo>
                {data.eventStartTime} ~ {data.eventEndTime}
              </EventDateArea>
              <EventTitleTypo variant="body2">{data.title}</EventTitleTypo>
            </StyledCardContents>
          </WrapperCard>
        )
      }
    })
  )
  return (
    <>
      {CardDisplay}
      {events.length >= 4 ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>もっと見る</Typography>
          </AccordionSummary>
          <AccordionDetails>{overCountCard}</AccordionDetails>
        </Accordion>
      ) : (
        ''
      )}
    </>
  )
}
export default EventCards
