import { useEffect, useState } from 'react'
import styled from 'styled-components'
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
  flex-basis: calc(100% / 2);
`
const H1Typo = styled(Typography)`
  font-size: 22px;
  line-height: 1.4;
`
const ListActions = styled(Grid)`
  padding: 1rem;
  justify-content: space-between;
  width: 60%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  @media screen and (min-width: 1024px) {
    display: flex;
  }
`
const ActionItem = styled(Grid)`
  font-size: 14px;
`
const ActionItemChild = styled(Grid)`
  position: relative;
  display: inline-block;
  padding-left: 1rem;
  @media screen and (max-width: 767px) {
    margin-top: 1rem;
    padding: 0;
    margin-right: 1rem;
  }
  &:hover {
    cursor: pointer;
    color: #0e7ac4;
  }
`
const CardContentGrid = styled(Grid)`
  @media screen and (min-width: 1024px) {
    min-width: 900px;
  }
`
const FlexGrid = styled(Grid)`
  justify-content: space-between;
  @media screen and (min-width: 1024px) {
    display: flex;
  }
`
const ResultList = () => {
  const [value, setValue] = useState('one')
  const [tagModal, setTagModal] = useState(false)
  const [events, setEvents] = useState(null)
  const [areas, setAreas] = useState(null)
  const [eventTags, setEventTags] = useState(null)
  useEffect(async () => {
    ;(async () => {
      const res = await axios.get('/api/get_events')
      setEvents(res.data.contents.events)
      setAreas(res.data.contents.areas)
      setEventTags(res.data.contents.tags)
    })()
  }, [])
  const tagModalClose = () => {
    setTagModal(false)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const TagFocus = e => {
    e.target.blur()
    setTagModal(true)
  }
  const eventDesc = () => {
    let descEvents = events.slice(0, events.length)
    let sortedDesc = descEvents.sort(function (a, b) {
      return a.event_start > b.event_start ? -1 : 1 //????????????????????????????????????
    })
    setEvents(sortedDesc)
  }
  const eventAsc = () => {
    let AscEvents = events.slice(0, events.length)
    let sortedAsc = AscEvents.sort(function (a, b) {
      return a.event_start < b.event_start ? -1 : 1 //????????????????????????????????????
    })
    setEvents(sortedAsc)
  }
  return (
    <>
      <Header />
      <WrapperGrid>
        <Bread />
        <H1Typo variant="h1" gutterBottom>
          <LocalOfferIcon />
          ?????????
        </H1Typo>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example">
            <StyledTab value="one" label="????????????" />
            <StyledTab value="two" label="????????????" />
          </Tabs>
        </Box>
        <Grid>
          <ListActions>
            {events && (
              <ActionItem>
                ????????????{events.length}???/?????????0???/???{events.length}???
              </ActionItem>
            )}
            <ActionItem className="flex">
              <ActionItemChild>
                <Link href="#">
                  <a>???????????????</a>
                </Link>
              </ActionItemChild>
              <ActionItemChild onClick={eventAsc}>????????????</ActionItemChild>
              <ActionItemChild onClick={eventDesc}>????????????</ActionItemChild>
              <ActionItemChild>
                <Link href="#">
                  <a>????????????</a>
                </Link>
              </ActionItemChild>
            </ActionItem>
          </ListActions>
          <FlexGrid>
            <CardContentGrid>
              {events && (
                <Grid style={{ marginRight: 8 }}>
                  {events.length != 0 ? (
                    <DisplayCards events={events} setEvents={setEvents} />
                  ) : (
                    <>???????????????????????????????????????</>
                  )}
                </Grid>
              )}
            </CardContentGrid>
            {areas && eventTags && (
              <SideBarSearchArea
                TagFocus={TagFocus}
                setEvents={setEvents}
                areas={areas}
                eventTags={eventTags}
              />
            )}
          </FlexGrid>
        </Grid>
        <TagModal tagModal={tagModal} tagModalClose={tagModalClose} />
      </WrapperGrid>
    </>
  )
}
export default ResultList
