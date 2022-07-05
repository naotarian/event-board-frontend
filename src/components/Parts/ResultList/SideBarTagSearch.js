import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '@/lib/axios'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
const StyledTagTypography = styled(Typography)`
  border-bottom: 3px solid rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
`
const Item = styled(Paper)`
  text-align: center;
  white-space: nowrap;
`
const FlexGrid = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
`
const TagGrid = styled(Grid)`
  margin-right: 1rem;
  margin-bottom: 1rem;
`
const TagItem = styled(Item)`
  min-width: 40px;
  padding: 0 1rem;
  cursor: pointer;
`
const TagButton = styled(Button)`
  min-width: 40px;
  padding: 0 1rem;
  cursor: pointer;
  text-transform: none;
`
const SideBarTagSearch = props => {
  const { setEvents, eventTags } = props
  const ClickTag = tagId => {
    let sendData = {}
    sendData.tagId = tagId
    axios.post('/api/event_tag_search', sendData).then(res => {
      setEvents(res.data.contents)
    })
  }
  return (
    <Grid>
      <StyledTagTypography variant="h2" gutterBottom component="div">
        タグからイベントをさがす
      </StyledTagTypography>
      <Box>
        <FlexGrid>
          {eventTags.map((data, index) => (
            <TagGrid key={index}>
              <TagButton
                variant="contained"
                color="primary"
                onClick={() => ClickTag(data.id)}>
                {data.tag_name}
              </TagButton>
            </TagGrid>
          ))}
        </FlexGrid>
      </Box>
    </Grid>
  )
}
export default SideBarTagSearch
