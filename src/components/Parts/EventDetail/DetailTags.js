import { useEffect, useState } from 'react'
import styled from "styled-components"
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
const DetailTags = () => {
  const tags = ['セキュリティ', 'javascript', '機械学習', 'UX', 'DevOps', 'iOS', 'デジタルマーケティング', 'Go', 'Azure', 'Deep Learning']
  return (
    <FlexGrid>
      {tags.map((data, index) => (
        <TagGrid key={index}>
          <TagButton
            variant="contained"
            color="primary"
            onClick={() => ClickTag(index)}
          >
            {data}
          </TagButton>
        </TagGrid>
      ))}
    </FlexGrid>
  )
}
export default DetailTags