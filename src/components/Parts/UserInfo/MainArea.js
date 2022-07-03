import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import styled from 'styled-components'
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
//components
import EventCard from '@/components/Parts/UserInfo/EventCard'

const MainAreaGrid = styled(Grid)`
  @media screen and (min-width: 1024px) {
    width: 800px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
`
const MainArea = props => {
  const { userInfo } = props
  return (
    <MainAreaGrid>
      <Typography
        variant="h1"
        style={{ textAlign: 'center', marginBottom: '1rem' }}>
        主な主催イベント
      </Typography>
      <EventCard events={userInfo.events} />
    </MainAreaGrid>
  )
}
export default MainArea
