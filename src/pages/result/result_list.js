import { useEffect, useState } from 'react'
import styled from "styled-components"
import Header from '../../components/Parts/Template/Header'
import { useAuth } from '@/hooks/auth'
import Bread from '../../components/Parts/Template/Breadcrumbs'
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

const StyledTabList = styled(TabList)`
  width: fit-content;
  margin: 0 auto;
`
const WrapperCard = styled(Card)`
  width: 70%;
`
const WrapperGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
`
const StyledTab = styled(Tab)`
  flex-basis: calc(100% / 2)
`
const ContentTag = styled(Grid)`
  width: 100%;
`
const H1Typo = styled(Typography)`
  font-size: 22px;
  line-height: 1.4; 
`
const ResultList = () => {
  const { user } = useAuth({ middleware: 'auth' })
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  )
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <>
      <Header />
      <WrapperGrid>
        <Bread />
        <H1Typo variant="h1" gutterBottom>
          <LocalOfferIcon />交流会
        </H1Typo>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <StyledTab value="one" label="Item One" />
            <StyledTab value="two" label="Item Two" />
          </Tabs>
        </Box>
        <WrapperCard>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </WrapperCard>
      </WrapperGrid>
    </>
  )
}
export default ResultList