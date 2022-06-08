import { useEffect, useState } from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ja'
import axios from '@/lib/axios'
import Image from 'next/image'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
//components
import DetailTags from './DetailTags'
import EventContent from './EventContent'
const MainPaper = styled(Paper)`
  @media screen and (min-width:1024px) {
    width: 800px;
  }
  margin-top: 1rem;
`
const MainWrapper = styled(Grid)`
  padding: 1rem 2rem;
`
const Baner = styled(Typography)`
  background-color: #3F50B5;
  color: #fff;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 5px;
`
const MainArea = (props) => {
  const { eventInfo } = props
  return (
    <MainPaper elevation={0}>
      {eventInfo && (
        <>
          <Image src='/images/test.jpeg' alt='logo' width='800' height='400' />
          <MainWrapper>
            <Typography variant='h2' gutterBottom>
              {eventInfo.title}
            </Typography>
            <DetailTags />
            <Baner>イベント内容</Baner>
            <EventContent eventInfo={eventInfo} />
          </MainWrapper>
        </>
      )}
    </MainPaper>
  )
}
export default MainArea