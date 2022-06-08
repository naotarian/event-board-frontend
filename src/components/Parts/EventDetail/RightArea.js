import { useEffect, useState } from 'react'
import styled from "styled-components"
import { useRouter } from 'next/router'
import moment from 'moment'
import 'moment/locale/ja'
import axios from '@/lib/axios'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
const RightAreaWrapper = styled(Grid)`
  width: 300px;
  margin-top: 1rem;
`
const RightArea = (props) => {
  const { eventInfo } = props
  return (
    <RightAreaWrapper>
      testdd
    </RightAreaWrapper>
  )
}
export default RightArea