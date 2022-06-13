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
//icons
import BookmarkIcon from '@mui/icons-material/Bookmark';
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
const NumberOfApplicants = styled(Typography)`
  text-align: right;
  padding-right: 1rem;
`
const StyledCardActions = styled(CardActions)`
  border-top: 1px solid #ddd;
  padding: 0.5rem 1rem;
  justify-content: space-between;
`
const DisplayCards = (props) => {
  const { events, setEvents } = props
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
  const clickTag = (tagId) => {
    let sendData = {}
    sendData.tagId = tagId
    axios.post('/api/event_tag_search', sendData)
      .then(res => {
        setEvents(res.data.contents)
      }).catch(error => {

      })
  }
  const bookmaek = (bookSelectId) => {
    console.log(bookSelectId)
  }
  return (
    <>
      {events.map((data, index) => (
        <WrapperCard key={index}>
          <StyledCardContents>
            <EventDateArea variant='body1' gutterBottom>
              <EventDateTypo>{data.eventDate}</EventDateTypo>{data.eventStartTime} ~ {data.eventEndTime}
            </EventDateArea>
            <EventTitleTypo variant='body2'>
              <Link href={`/result/event?event=${data.id}`} style={{ color: 'red' }}>
                <a style={{ color: '#333' }}>{data.title}</a>
              </Link>
            </EventTitleTypo>
          </StyledCardContents>
          <NumberOfApplicants variant='body1'>0/{data.number_of_applicants}人</NumberOfApplicants>
          <StyledCardActions>
            <Button size="small" onClick={() => mypage(data)}>{data.user.name}</Button>
            <Typography variant='body1' gutterBottom>
              {Object.entries(data.id_tagname).map(([key, tag], index) => (
                <Button size="small" onClick={() => clickTag(key)} key={index}>{tag}</Button>
              ))}
            </Typography>
            <BookmarkIcon style={{ cursor: 'pointer' }} onClick={() => bookmaek(data.id)} />
          </StyledCardActions>
        </WrapperCard>
      ))}
    </>
  )
}
export default DisplayCards