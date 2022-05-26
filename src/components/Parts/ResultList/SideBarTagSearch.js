import { useEffect, useState } from 'react'
import styled from "styled-components"
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
const SideBarTagSearch = () => {
  const tags = ['セキュリティ', 'javascript', '機械学習', 'UX', 'DevOps', 'iOS', 'デジタルマーケティング', 'Go', 'Azure', 'Deep Learning']
  const ClickTag = (index) => {
    console.log(index)
  }
  return (
    <Grid>
      <StyledTagTypography variant="h2" gutterBottom component="div">
        タグからイベントをさがす
      </StyledTagTypography>
      <Box>
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
      </Box>
    </Grid>
  )
}
export default SideBarTagSearch