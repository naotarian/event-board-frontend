import { useEffect, useState } from 'react'
//mui
import Paper from '@mui/material/Paper'
import styled from 'styled-components'
import Grid from '@mui/material/Grid'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
//components
import SideBarTagSearch from './SideBarTagSearch'
import SideBarSearch from './SideBarSearch'
//css
const SideBar = styled(Paper)`
  padding: 1.5rem;
  margin: 0 auto 2rem auto;
  width: 100%;
  @media screen and (max-width: 767px) {
    width: 85%;
  }
`
const SideBarWrapper = styled(Grid)`
  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
const SideBarSearchArea = props => {
  const [selectDateStart, setSelectDateStart] = useState(null)
  const [selectDateEnd, setSelectDateEnd] = useState(null)
  const { TagFocus, setEvents, areas, eventTags } = props
  return (
    <SideBarWrapper>
      <SideBar>
        <SideBarSearch
          TagFocus={TagFocus}
          setEvents={setEvents}
          areas={areas}
        />
      </SideBar>
      <SideBarTagSearch setEvents={setEvents} eventTags={eventTags} />
    </SideBarWrapper>
  )
}
export default SideBarSearchArea
