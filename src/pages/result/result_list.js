import { useEffect, useState } from 'react'
import styled from "styled-components"
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
//componentes
import Header from '../../components/Parts/Template/Header'
import TagModal from '../../components/Parts/ResultList/TagModal'
import Bread from '../../components/Parts/Template/Breadcrumbs'
import SideBarSearchArea from '../../components/Parts/ResultList/SideBarSearchArea'
import DisplayCards from '@/components/Parts/ResultList/DisplayCards'
//mui
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import Link from 'next/link'

const WrapperGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
`
const StyledTab = styled(Tab)`
  flex-basis: calc(100% / 2)
`
const H1Typo = styled(Typography)`
  font-size: 22px;
  line-height: 1.4; 
`
const ListActions = styled(Grid)`
  padding :1rem;
  display: flex;
  justify-content: space-between;
  width: 60%;
`
const ActionItem = styled(Grid)`
  font-size: 14px;
`
const ActionItemChild = styled(Grid)`
  position:relative;
  display:inline-block;
  padding-left: 1rem;
  &:hover {
    cursor: pointer;
    color: #0e7ac4;
  }
`
const MainContentGrid = styled(Grid)`
  // display: flex;
`
const FlexGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
`
const ResultList = () => {
  const { user } = useAuth({ middleware: 'auth' })
  const [value, setValue] = useState('one');
  const [tagModal, setTagModal] = useState(false);
  const [events, setEvents] = useState(null)
  const [areas, setAreas] = useState(null)
  useEffect(async () => {
    axios.get('/api/get_events')
      .then(res => {
        console.log(res)
        setEvents(res.data.contents.events)
        setAreas(res.data.contents.areas)
      }).catch(error => {

      })
  }, [])
  const tagModalClose = () => {
    setTagModal(false)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const TagFocus = (e) => {
    e.target.blur()
    setTagModal(true)
  }
  const eventDesc = () => {
    let descEvents = events.slice(0, events.length)
    let sortedDesc = descEvents.sort(function (a, b) {
      return (a.event_start > b.event_start) ? -1 : 1;  //オブジェクトの降順ソート
    });
    setEvents(sortedDesc)
  }
  const eventAsc = () => {
    let AscEvents = events.slice(0, events.length)
    let sortedAsc = AscEvents.sort(function (a, b) {
      return (a.event_start < b.event_start) ? -1 : 1;  //オブジェクトの昇順ソート
    });
    setEvents(sortedAsc)
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
            <StyledTab value="one" label="イベント" />
            <StyledTab value="two" label="レポート" />
          </Tabs>
        </Box>
        <MainContentGrid>
          <ListActions>
            {events && (
              <ActionItem>開催予定{events.length}件/開催中0件/全{events.length}件</ActionItem>
            )}
            <ActionItem className="flex">
              <ActionItemChild>
                <Link href="#">
                  <a>おすすめ順</a>
                </Link>
              </ActionItemChild>
              <ActionItemChild onClick={eventAsc}>
                開催昇順
              </ActionItemChild>
              <ActionItemChild onClick={eventDesc}>
                開催降順
              </ActionItemChild>
              <ActionItemChild>
                <Link href="#">
                  <a>申込数順</a>
                </Link>
              </ActionItemChild>
            </ActionItem>
          </ListActions>
          <FlexGrid>
            <Grid>
              {events && (
                <DisplayCards events={events} />
              )}
            </Grid>
            {areas && (
              <SideBarSearchArea TagFocus={TagFocus} setEvents={setEvents} areas={areas} />
            )}
          </FlexGrid>
        </MainContentGrid>
        <TagModal tagModal={tagModal} tagModalClose={tagModalClose} />
      </WrapperGrid>
    </>
  )
}
export default ResultList
