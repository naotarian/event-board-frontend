import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import styled from "styled-components"
import Grid from '@mui/material/Grid'

const MainAreaGrid = styled(Grid)`
  @media screen and (min-width:1024px) {
    width: 800px;
  }
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
`
const MainArea = () => {
  return (
    <MainAreaGrid>test</MainAreaGrid>
  )
}
export default MainArea