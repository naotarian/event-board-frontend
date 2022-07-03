import { useEffect, useState } from 'react'
import styled from 'styled-components'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
const Item = styled(Paper)`
  text-align: center;
  white-space: nowrap;
`
const FlexGrid = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
`
const TagGrid = styled(Grid)`
  margin-right: 0.5rem;
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
const DetailTags = props => {
  const { eventInfo } = props
  const ClickTag = index => {
    console.log(index)
  }
  return (
    <FlexGrid>
      {eventInfo.set_tags.map((tag, key) => (
        <TagGrid key={key}>
          <TagButton
            variant="contained"
            color="primary"
            onClick={() => ClickTag(tag.id)}>
            {tag.tag_name}
          </TagButton>
        </TagGrid>
      ))}
    </FlexGrid>
  )
}
export default DetailTags
