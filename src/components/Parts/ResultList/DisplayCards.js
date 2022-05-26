import { useEffect, useState } from 'react'
import styled from "styled-components"
//mui
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import Link from 'next/link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
//css
import Css from '../../../../styles/result_list.module.css'
const WrapperCard = styled(Card)`
  width: 85%;
  max-height: 240px;
  margin-bottom: 2rem;
`
const DisplayCards = (props) => {
  const { cardData } = props
  return (
    <>
      {Object.entries(cardData).map((data, index) => (
        <WrapperCard key={index}>
          <CardContent className="flex">
            <Typography variant='body1' gutterBottom className={`bold ${Css.card_date}`}>
              <span className={`fs12`}>{data.date}</span><br /> 17:00 ~ 21:00
            </Typography>
            <Typography className="bold fs15rem" variant='body1'>
              エンジニアの自由研究発表会vol.6 ～IoT／ローコード開発／アプリ開発etc～業務外でエンジニアスキルを活かしてみた！
            </Typography>
          </CardContent>
          <CardActions className={Css.bottom_card_action}>
            <Button size="small">Learn More</Button>
          </CardActions>
        </WrapperCard>

      ))}
    </>
  )
}
export default DisplayCards