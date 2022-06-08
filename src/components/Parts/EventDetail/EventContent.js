import { useEffect, useState } from 'react'
import styled from "styled-components"
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
const SubTitle = styled(Grid)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-weight: 500;
  border-bottom: 2px solid #27AE60;
  font-size: 1.2rem;
`

const EventContent = (props) => {
  const { eventInfo } = props
  return (
    <>
      <SubTitle>概要</SubTitle>
      <Grid>
        {eventInfo.overview}
      </Grid>
    </>
  )
}
export default EventContent