import { useEffect, useState } from 'react'
import styled from "styled-components"
//mui
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
const StyledTagTypography = styled(Typography)`
  border-bottom: 3px solid rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
`
const SideBarTagSearch = () => {
  const handleClick = (e) => {
    console.info(e.target);
  }
  return (
    <Grid>
      <StyledTagTypography variant="h2" gutterBottom component="div">
        タグからイベントをさがす
      </StyledTagTypography>
      <Stack direction="row" spacing={1}>
        <Chip label="Clickable" variant="outlined" onClick={handleClick} value="1" />
      </Stack>
    </Grid>
  )
}
export default SideBarTagSearch