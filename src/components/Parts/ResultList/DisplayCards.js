import { useEffect, useState } from 'react'
import styled from "styled-components"
//mui
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
//css
import Css from '../../../../styles/result_list.module.css'
const WrapperCard = styled(Card)`
  width: 85%;
  max-height: 240px;
  margin-bottom: 2rem;
`
const DisplayCards = (props) => {
  const { events } = props
  return (
    <>
      {events.map((data, index) => (
        <WrapperCard key={index}>
          <CardContent className="flex">
            <Typography variant='body1' gutterBottom className={`bold ${Css.card_date}`}>
              <span className={`fs12`}>{data.date}</span><br />{data.event_start}
            </Typography>
            <Typography className="bold fs15rem" variant='body1'>
              {data.title}
            </Typography>
          </CardContent>
          <CardActions className={Css.bottom_card_action}>
            <Button size="small">{data.user_id}</Button>
          </CardActions>
        </WrapperCard>

      ))}
    </>
  )
}
export default DisplayCards