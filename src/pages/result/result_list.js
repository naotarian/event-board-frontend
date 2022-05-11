import { useEffect } from 'react'
import styled from "styled-components"
import Grid from '@mui/material/Grid'
import Header from '../../components/Parts/Template/Header'
import { useAuth } from '@/hooks/auth'

const ResultList = () => {
  const { user } = useAuth({ middleware: 'auth' })
  return (
    <>
      <Header />
      test
    </>
  )
}
export default ResultList