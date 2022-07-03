import { useState } from 'react'
import styled from 'styled-components'
//mui
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'
const SubTitle = styled(Grid)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-weight: 500;
  border-bottom: 2px solid #27ae60;
  font-size: 1.2rem;
`
const ButtonArea = styled(Grid)`
  text-align: center;
  margin-top: 2rem;
`
const StyledLoadingButton = styled(LoadingButton)`
  @media screen and (min-width: 1024px) {
    width: 500px;
  }
  height: 50px;
  margin: 0 auto;
`

const EventContent = props => {
  const { eventInfo } = props
  const [loading, setLoading] = useState(false)
  return (
    <>
      <SubTitle>概要</SubTitle>
      <Grid>{eventInfo.overview}</Grid>
      <SubTitle>テーマ</SubTitle>
      <Grid>{eventInfo.theme}</Grid>
      <SubTitle>こんな方におすすめ</SubTitle>
      <Grid>{eventInfo.recommendation}</Grid>
      <SubTitle>注意事項</SubTitle>
      <Grid>{eventInfo.notes}</Grid>
    </>
  )
}
export default EventContent
